import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { IPoint } from 'src/app/interfaces/IPoint';

import { DrawCircle } from 'src/app/models/draw/DrawCircle';
import { DrawLines } from '../../models/draw/DrawLines';
import { DrawRectangle } from '../../models/draw/DrawRectangle';
import { DrawViewport } from '../../models/draw/DrawViewport';
import { DrawWorld } from '../../models/draw/DrawWorld';

import { Circle } from 'src/app/models/Circle';
import { Lines } from 'src/app/models/Lines';
import { Point } from '../../models/Point';
import { Rectangle } from '../../models/Rectangle';
import { ReflectionAboutHorizontalLine } from 'src/app/models/transform/ReflectionAboutHorizontalLine';
import { ReflectionAboutVerticalLine } from 'src/app/models/transform/ReflectionAboutVerticalLine';
import { Scale } from 'src/app/models/transform/Scale';
import { Size } from '../../models/Size';
import { Translation } from 'src/app/models/transform/Translation';
import { IDrawElement } from 'src/app/interfaces/IDrawElement';

@Component({
    selector: 'gr-fishbowl'
    , templateUrl: './drawing.component.html'
})
export class FishBowlComponent implements AfterViewInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    height: number = 600;
    width: number = 600;

    buttonText: string = "Start";
    elapsedMilliseconds: number = 0;
    frameCounter: number = 0;
    frameRate: number = 30;                 // Frames per second.
    timer: any;
    drawWorld: DrawWorld;

    public clearCanvas() {
        var start = Date.now();

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.elapsedMilliseconds = Date.now() - start;
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

        for (let index = 0; index < 10; index++) {
            drawWorld.addElement(new DrawCircle(new Circle(new Point(200, 200), 5)), "bb" + index, new Translation(new Point((200 - 10 * index) / this.frameRate, (100 + 10 * index) / this.frameRate)));           
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

    public toggleAnimation(context: CanvasRenderingContext2D): void {

        if (this.buttonText == "Start") {
            this.buttonText = "Stop";
            this.timer = setInterval(this.animateFrame, 1000 / this.frameRate, this);
        }
        else {
            this.buttonText = "Start";
            clearInterval(this.timer);
        }
    }

    //----==== PRIVATE ====------------------------------------------------------------------------

    private animateFrame(drawing: FishBowlComponent): void {

        // !!!!! DON'T REFERENCE 'this' IN THIS METHOD !!!!!

        drawing.frameCounter++;

        // Contain all of the elements.

        drawing.drawWorld.elements.forEach(element => drawing.containDrawElement(element, drawing));

        // So far, this is fast enough to clear and redraw the entire frame. (even on my crappy i5, I need to test on a phone too)

        drawing.drawWorld.animateFrame();
        drawing.clearCanvas();
        drawing.drawWorld.draw(drawing.context);
    }

    /**
     * This may go into the viewport code.
     * 
     * @param elementName 
     * @param component 
     */
    containDrawElement(element: IDrawElement, component: FishBowlComponent): IPoint {
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