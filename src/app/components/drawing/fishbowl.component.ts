import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { IDrawElement } from 'src/app/draw/interfaces/IDrawElement';
import { IPoint } from 'src/app/models/interfaces/IPoint';

import { DrawCircle } from 'src/app/draw/primitives/DrawCircle';
import { DrawLines } from '../../draw/primitives/DrawLines';
import { DrawRectangle } from '../../draw/primitives/DrawRectangle';
import { DrawViewport } from '../../draw/DrawViewport';
import { DrawWorld } from '../../draw/DrawWorld';

import { Circle } from 'src/app/models/Circle';
import { Collision } from 'src/app/models/Collision';
import { Lines } from 'src/app/models/Lines';
import { Momentum } from 'src/app/models/Momentum';
import { Point } from '../../models/Point';
import { Rectangle } from '../../models/Rectangle';
import { ReflectionAboutHorizontalLine } from 'src/app/models/transform/ReflectionAboutHorizontalLine';
import { ReflectionAboutVerticalLine } from 'src/app/models/transform/ReflectionAboutVerticalLine';
import { Scale } from 'src/app/models/transform/Scale';
import { Size } from '../../models/Size';
import { Translation } from 'src/app/models/transform/Translation';
import { Vector } from 'src/app/models/Vector';

@Component({
    selector: 'gr-fishbowl'
    , templateUrl: './drawing.component.html'
})
export class FishBowlComponent implements AfterViewInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;
    private drawWorld: DrawWorld;

    height: number = 600;
    width: number = 600;

    collisions: boolean = true;
    elapsedMilliseconds: number = 0;
    frameCounter: number = 0;
    frameRate: number = 30;                 // Frames per second.
    timer: any;

    animateSingleFrame(): void {
        this.animateFrame(this);
    }

    public clearCanvas() {
        var start = Date.now();

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.elapsedMilliseconds = Date.now() - start;
    }

    public collisionsChanged(isChecked: boolean): void {
        
    }

    ngAfterViewInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

        var start = Date.now();

        var closedLoop = true;

        this.context = this.canvas.nativeElement.getContext("2d");

        var drawViewport = new DrawViewport(this.context);
        var drawWorld = new DrawWorld(null, drawViewport);

        drawWorld.addElement(new DrawRectangle(new Rectangle(new Point(drawViewport.size.width / 2, drawViewport.size.height / 2), new Size(drawViewport.size.width, drawViewport.size.height))));

        var lines = new Lines();

        // lines.addPoint(new Point(250, 300));     // mouth
        lines.addPoint(new Point(350, 300));
        lines.addPoint(new Point(250, 350));
        lines.addPoint(new Point(50, 250));        // tail
        lines.addPoint(new Point(50, 350));        // tail
        lines.addPoint(new Point(250, 250));
        lines.addPoint(new Point(350, 300));

        var drawLines = new DrawLines(lines, !closedLoop);

        drawLines.transform(new Scale(new Point(0.30, 0.25)));

        // In order to get the reference to a point, the lines need to be added to the world.

        drawWorld.addElement(drawLines, "fish", new Translation(new Point(100 / this.frameRate, 50 / this.frameRate)));

        drawWorld.addElement(new DrawCircle(new Circle(new Point(500, 500), 30)), "basketball", new Translation(new Point(100 / this.frameRate, 50 / this.frameRate)));

        drawWorld.addElement(new DrawCircle(new Circle(new Point(400, 400), 20)), "baseball", new Translation(new Point(150 / this.frameRate, 75 / this.frameRate)));

        drawWorld.addElement(new DrawCircle(new Circle(new Point(300, 300), 10)), "marble", new Translation(new Point(200 / this.frameRate, 100 / this.frameRate)));

        // A bunch of bb's start at the same point and explode at different vectors

        for (let index = 0; index < 10; index++) {
            //drawWorld.addElement(new DrawCircle(new Circle(new Point(100 + index * 13, 400), 5)), "bb" + index, new Translation(new Point((200 - 10 * index) / this.frameRate, (100 + 10 * index) / this.frameRate)));
        }

        // A bunch of bb's start at the same point and explode at different vectors (restricting the y vector)

        for (let index = 0; index < 5; index++) {
            drawWorld.addElement(new DrawCircle(new Circle(new Point(100 + index * 13, 500), 5)), "bb" + index, new Translation(new Point((200 - 10 * index) / this.frameRate, 0)));
        }

        drawWorld.draw(this.context);

        this.drawWorld = drawWorld;
        this.elapsedMilliseconds = Date.now() - start;
    }

    onResize(event) {
        // The canvas is based on the width and height

        this.width = event.target.innerWidth - 20;
        this.height = event.target.innerHeight - 215;

        //this.drawWorld.draw(this.context);

        this.ngAfterViewInit();

        // Fire a redraw after a bit.
        //setTimeout(this.drawWorld.draw, 100, this.context);
        //setTimeout(this.ngAfterViewInit, 250);
    }

    public toggleAnimation(started: boolean): void {

        if (started) {
            this.timer = setInterval(this.animateFrame, 1000 / this.frameRate, this);
        }
        else {
            clearInterval(this.timer);
        }
    }

    //----==== PRIVATE ====------------------------------------------------------------------------

    private animateFrame(drawing: FishBowlComponent): void {

        // !!!!! DON'T REFERENCE 'this' IN THIS METHOD !!!!!
        // (THIS is effectively a STATIC method because there is NO 'this')
        // (this is being passed in as an argument)

        drawing.frameCounter++;

        // TODO: Check for collisions (from the previous animateFrame call)...
        // O(N log(N)) - need to save already compared elements (skipCount does this)

        var skipCount = 0;

        drawing.drawWorld.elements.forEach(element => {
            drawing.checkForCollsions(element, drawing, skipCount);

            skipCount++;
        });

        // Contain all of the elements.

        drawing.drawWorld.elements.forEach(element => {
            drawing.containDrawElement(element, drawing);
        });

        // So far, this is fast enough to clear and redraw the entire frame. (even on my crappy i5, I need to test on a phone too)

        drawing.drawWorld.animateFrame();
        drawing.clearCanvas();
        drawing.drawWorld.draw(drawing.context);
    }

    private checkForCollsions(collisionElement: IDrawElement, drawing: FishBowlComponent, skipCount: number) {
        var collisionCircle = collisionElement as DrawCircle;

        drawing.drawWorld.elements.forEach(element => {

            if (skipCount <= 0) {
                var elementCircle = element as DrawCircle;

                // The element cannot collide with itself.

                if (collisionElement !== element
                    && collisionCircle.circle !== undefined         // Verifying that the elements are circles.
                    && elementCircle.circle !== undefined) {
                    var transformation = <Translation>drawing.drawWorld.findDrawTransformation(collisionCircle);
                    var transformation2 = <Translation>drawing.drawWorld.findDrawTransformation(elementCircle);

                    // TODO: Check the distance.
                    // Apply the next transformation.
                    // If they are further apart, then don't do anything
                    // Otherwise check for a collision

                    // The collisions act as if they hit on center and trade momentum,
                    // but there are glancing blows that should adjust the angle of tragectory.

                    // Has there been a collision based on the previous transformation?
                    // (You shouldn't have to do both of these since the "else" piece
                    // should prevent the circle from being inside the other circle in the first place.)

                    if (drawing.checkForCollision(collisionCircle, elementCircle)) {
                        drawing.reflectCircles(collisionCircle, transformation, elementCircle, transformation2);

                    } else {
                        // Will there be a collision at the next transformation?

                        var nextCollisionCircle = <DrawCircle>collisionCircle.clone();
                        var nextElementCircle = <DrawCircle>elementCircle.clone();

                        nextCollisionCircle.transform(transformation);
                        nextElementCircle.transform(transformation2);

                        if (drawing.checkForCollision(nextCollisionCircle, nextElementCircle)) {
                            drawing.reflectCircles(collisionCircle, transformation, elementCircle, transformation2);
                        }
                    }
                }
            }

            skipCount--;
        });
    }

    private checkForCollision(collisionCircle: DrawCircle, elementCircle: DrawCircle): boolean {
        var collision = new Collision(collisionCircle.circle)
        var collision2 = new Collision(elementCircle.circle)

        return collision.collidedWith(collision2);
    }

    private reflectCircles(collisionCircle: DrawCircle, transformation: Translation, elementCircle: DrawCircle, transformation2: Translation): void {
        var momentum = new Momentum(collisionCircle.mass, new Vector(transformation.translation));
        var momentum2 = new Momentum(elementCircle.mass, new Vector(transformation2.translation));

        momentum.reflectWith(momentum2);

        transformation.translation = momentum.velocity.point;
        transformation2.translation = momentum2.velocity.point;
    }

    /**
     * This may go into the viewport code.
     * 
     * @param elementName
     * @param component
     */
    private containDrawElement(element: IDrawElement, component: FishBowlComponent): IPoint {
        var result = new Point(0, 0);       // Non zero if the element was contained by X or Y

        if (element != null) {
            var bounds = element.bounds();

            if (bounds.max.x > component.width || bounds.min.x < 0) {
                var transformation = <Translation>component.drawWorld.findDrawTransformation(element);

                transformation.translation.x *= -1;     // Adjust the reference.

                element.transform(new ReflectionAboutVerticalLine(element.bounds().cloneRectangle().center.x));

                result.x = 1;
            }

            if (bounds.max.y > component.height || bounds.min.y < 0) {
                var transformation = <Translation>component.drawWorld.findDrawTransformation(element);

                transformation.translation.y *= -1;     // Adjust the reference.

                element.transform(new ReflectionAboutHorizontalLine(element.bounds().cloneRectangle().center.y));

                result.y = 1;
            }
        }

        return result;
    }
}