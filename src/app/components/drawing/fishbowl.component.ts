import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { IDrawElement } from 'src/app/draw/interfaces/IDrawElement';
import { IPoint } from 'src/app/models/interfaces/IPoint';
import { IVector } from 'src/app/models/interfaces/IVector';

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
import { DrawLine } from 'src/app/draw/primitives/DrawLine';
import { Line } from 'src/app/models/Line';

@Component({
    selector: 'gr-fishbowl'
    , templateUrl: './fishbowl.component.html'
})
export class FishBowlComponent implements AfterViewInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;
    private drawWorld: DrawWorld;

    // Height and width of the canvas.
    canvasHeight: number = 600;
    canvasWidth: number = 600;

    collisions: boolean = true;
    elapsedMilliseconds: number = 0;
    elements: number = 0;
    frameCounter: number = 0;
    frameRate: number = 60;                 // Frames per second.
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
        this.collisions = isChecked;
    }

    public frameRateChanged(event: string) {
        this.frameRate = parseInt(event);

        // TODO: Adjust the Transformations based on the new frame rate.
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

        // drawWorld.addElement(new DrawCircle(new Circle(new Point(500, 500), 30)), "basketball", new Translation(new Point(100 / this.frameRate, 50 / this.frameRate)));

        // drawWorld.addElement(new DrawCircle(new Circle(new Point(400, 400), 20)), "baseball", new Translation(new Point(150 / this.frameRate, 75 / this.frameRate)));

        var index = 0;

        // drawWorld.addElement(new DrawCircle(new Circle(new Point(50, 100), 10)), "marble" + (index++).toString(), new Translation(new Point(100 / this.frameRate, -50 / this.frameRate)));
        // drawWorld.addElement(new DrawCircle(new Circle(new Point(75, 100), 10)), "marble" + (index++).toString(), new Translation(new Point(-100 / this.frameRate, -50 / this.frameRate)));

        // drawWorld.addElement(new DrawCircle(new Circle(new Point(150, 150), 10)), "marble" + (index++).toString(), new Translation(new Point(100 / this.frameRate, 50 / this.frameRate)));
        // drawWorld.addElement(new DrawCircle(new Circle(new Point(175, 150), 10)), "marble" + (index++).toString(), new Translation(new Point(0, 0)));

        // 90 degree reflection
        drawWorld.addElement(new DrawCircle(new Circle(new Point(275, 100), 10)), "marble" + (index++).toString(), new Translation(new Point(100 / this.frameRate, 0)));
        drawWorld.addElement(new DrawCircle(new Circle(new Point(300, 115), 10)), "marble" + (index++).toString(), new Translation(new Point(-100 / this.frameRate, 0)));

        // marble catching another marble in exactly the same direction.
        drawWorld.addElement(new DrawCircle(new Circle(new Point(150, 200), 10)), "marble" + (index++).toString(), new Translation(new Point(200 / this.frameRate, 0)));
        drawWorld.addElement(new DrawCircle(new Circle(new Point(200, 200), 10)), "marble" + (index++).toString(), new Translation(new Point(100 / this.frameRate, 0)));

        // drawWorld.addElement(new DrawCircle(new Circle(new Point(330, 105), 15)), "marble" + (index++).toString(), new Translation(new Point(-100 / this.frameRate, 0)));

        // A bunch of bb's start at the same point and explode at different vectors

        for (let index = 0; index < 10; index++) {
            //drawWorld.addElement(new DrawCircle(new Circle(new Point(100 + index * 13, 400), 5)), "bb" + index, new Translation(new Point((200 - 10 * index) / this.frameRate, (100 + 10 * index) / this.frameRate)));
        }

        // A bunch of bb's start at the same point and explode at different vectors (restricting the y vector)

        for (let index = 0; index < 5; index++) {
            //           drawWorld.addElement(new DrawCircle(new Circle(new Point(100 + index * 13, 500), 5)), "bb" + index, new Translation(new Point((200 - 10 * index) / this.frameRate, 0)));
        }

        drawWorld.draw(this.context);

        this.drawWorld = drawWorld;
        this.elapsedMilliseconds = Date.now() - start;
        this.elements = drawWorld.elements.length;          // Number of elements
    }

    onResize(event) {
        // The canvas is based on the width and height

        this.canvasWidth = event.target.innerWidth - 20;
        this.canvasHeight = event.target.innerHeight - 305;

        // TODO: Need to figure out why the context is invalid after a resize.

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
        // ('this' is being passed in as an argument (drawing))

        drawing.frameCounter++;

        // TODO: Check for collisions (from the previous animateFrame call)...
        // O(N log(N)) - need to save already compared elements (skipCount does this)

        if (drawing.collisions) {
            var skipCount = 0;

            drawing.drawWorld.elements.forEach(element => {
                drawing.checkForCollsions(element, drawing, skipCount);

                skipCount++;
            });
        }

        // Contain all of the elements.

        drawing.drawWorld.elements.forEach(element => {
            drawing.containDrawElement(element, drawing);
        });

        // So far, this is fast enough to clear and redraw the entire frame. (even on my crappy i5, I need to test on a phone too)

        drawing.drawWorld.animateFrame();
        drawing.clearCanvas();
        drawing.drawWorld.draw(drawing.context);
        drawing.elements = drawing.drawWorld.elements.length;          // Number of elements
    }

    private checkForCollsions(collisionElement: IDrawElement, drawing: FishBowlComponent, skipCount: number) {
        var collisionCircle = collisionElement as DrawCircle;

        if (collisionCircle.circle !== undefined) {             // Verifying that the elements are circles.

            drawing.drawWorld.elements.forEach(element => {

                if (skipCount <= 0) {
                    var elementCircle = element as DrawCircle;

                    // The element cannot collide with itself.

                    if (collisionElement !== element
                        && elementCircle.circle !== undefined) {        // Verifying that the elements are circles.
                        var transformation = <Translation>drawing.drawWorld.findDrawTransformation(collisionCircle);
                        var transformation2 = <Translation>drawing.drawWorld.findDrawTransformation(elementCircle);

                        // TODO: Check the distance.
                        // Apply the next transformation.
                        // If they are further apart, then don't do anything
                        // Otherwise check for a collision

                        // TODO: The collisions act as if they hit on center and trade momentum,
                        // but there are glancing blows that should adjust the angle of tragectory.

                        // Has there been a collision based on the previous transformation?
                        // (You shouldn't have to do both of these since the "else" piece
                        // should prevent the circle from being inside the other circle in the first place.)

                        if (drawing.checkForCollision(collisionCircle, elementCircle)) {
                            var vectorStart = new Vector(collisionCircle.circle.center.clone());
                            var vectorEnd = new Vector(elementCircle.circle.center.clone());

                            drawing.reflectCircles(collisionCircle, transformation, elementCircle, transformation2);

                            // If you don't clone the centers, the lines will transform with the circles.

                            drawing.drawWorld.addElement(new DrawLine(new Line(collisionCircle.circle.center, elementCircle.circle.center)), null, null, true);

                            // var vectorStart = new Vector(collisionCircle.circle.center.clone());
                            // var vectorEnd = new Vector(elementCircle.circle.center.clone());

                            // vectorStart.add(vectorEnd.multiplyByConstant(-1));
                        } else {
                            // Will there be a collision at the next transformation?

                            var nextCollisionCircle = <DrawCircle>collisionCircle.clone();
                            var nextElementCircle = <DrawCircle>elementCircle.clone();

                            nextCollisionCircle.transform(transformation);
                            nextElementCircle.transform(transformation2);

                            if (drawing.checkForCollision(nextCollisionCircle, nextElementCircle)) {
                                var isViewportRelative = true;

                                // If you don't clone the centers, the lines will transform with the circles.

                                drawing.drawWorld.addElement(new DrawLine(new Line(collisionCircle.circle.center.clone(), elementCircle.circle.center.clone())), null, null, isViewportRelative);

                                var vectorStart = new Vector(collisionCircle.circle.center.clone());
                                var vectorEnd = new Vector(elementCircle.circle.center.clone());

                                // The circles will reflect about a line (vector) connecting the centers.

                                //var vectorPerp = vectorStart.add(vectorEnd.multiplyByConstant(-1)).unitVector();
                                var vectorPerp = vectorEnd.add(vectorStart.multiplyByConstant(-1)).unitVector();

                                var vectorTranslation = new Vector(transformation.translation);

                                var vectorReflect = vectorTranslation.reflect(vectorPerp);

                                // Make the vector is larger so we can see it.

                                vectorReflect = vectorReflect.multiplyByConstant(vectorStart.add(vectorEnd.multiplyByConstant(-1)).magnitude());

                                var reflectLine = new DrawLine(new Line(new Point(0, 0), new Point(vectorReflect.point.x, vectorReflect.point.y)));

                                reflectLine.transform(new Translation(vectorStart.midpoint(vectorEnd).point));

                                drawing.drawWorld.addElement(reflectLine, null, null, isViewportRelative);

                                // Actually reflect the circles (change their transformations)

                                drawing.reflectCircles(collisionCircle, transformation, elementCircle, transformation2);
                            }
                        }
                    }
                }

                skipCount--;
            });
        }
    }

    private checkForCollision(collisionCircle: DrawCircle, elementCircle: DrawCircle): boolean {
        var collision = new Collision(collisionCircle.circle)
        var collision2 = new Collision(elementCircle.circle)

        return collision.collidedWith(collision2);
    }

    /**
     * 
     * @param collisionCircle 
     * @param transformation 
     * @param elementCircle 
     * @param transformation2 
     * @param perpendicular 
     */
    private reflectCircles(collisionCircle: DrawCircle, transformation: Translation, elementCircle: DrawCircle, transformation2: Translation): void {
        var vectorStart = new Vector(collisionCircle.circle.center.clone());
        var vectorEnd = new Vector(elementCircle.circle.center.clone());

        // A vector connecting the centers is CLOSE to the perpendicular to the reflection line.
        // (subtracting the centers results in that vector)

        var vectorPerp = vectorStart.add(vectorEnd.multiplyByConstant(-1)).unitVector();

        var vectorTranslation = new Vector(transformation.translation).reflect(vectorPerp).round(10);

        vectorPerp = vectorEnd.add(vectorStart.multiplyByConstant(-1)).unitVector();

        var vectorTranslation2 = new Vector(transformation2.translation).reflect(vectorPerp).round(10);

        // var momentum = new Momentum(collisionCircle.mass, vectorTranslation);
        // var momentum2 = new Momentum(elementCircle.mass, vectorTranslation2);

        // // Might change this to "conserve" since the vectors have already been reflected above.

        // momentum.reflectWith(momentum2);

        // transformation.translation = momentum.velocity.point;
        // transformation2.translation = momentum2.velocity.point;
        transformation.translation = vectorTranslation.point;
        transformation2.translation = vectorTranslation2.point;
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

            if (bounds.max.x > component.canvasWidth || bounds.min.x < 0) {
                var transformation = <Translation>component.drawWorld.findDrawTransformation(element);

                transformation.translation.x *= -1;     // Adjust the reference.

                element.transform(new ReflectionAboutVerticalLine(element.bounds().cloneRectangle().center.x));

                result.x = 1;
            }

            if (bounds.max.y > component.canvasHeight || bounds.min.y < 0) {
                var transformation = <Translation>component.drawWorld.findDrawTransformation(element);

                transformation.translation.y *= -1;     // Adjust the reference.

                element.transform(new ReflectionAboutHorizontalLine(element.bounds().cloneRectangle().center.y));

                result.y = 1;
            }
        }

        return result;
    }
}