import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { DrawLines } from '../../models/draw/DrawLines';
import { DrawRectangle } from '../../models/draw/DrawRectangle';
import { DrawViewport } from '../../models/draw/DrawViewport';
import { DrawWorld } from '../../models/draw/DrawWorld';

import { Lines } from 'src/app/models/Lines';
import { Point } from '../../models/Point';
import { Rectangle } from '../../models/Rectangle';
import { ReflectionAboutVerticalLine } from 'src/app/models/transform/ReflectionAboutVerticalLine';
import { Size } from '../../models/Size';
import { Scale } from 'src/app/models/transform/Scale';
import { Translation } from 'src/app/models/transform/Translation';
import { Circle } from 'src/app/models/Circle';
import { DrawCircle } from 'src/app/models/draw/DrawCircle';

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

        drawWorld.addElement(new DrawCircle(new Circle(new Point(500, 500), 30)), "ball", new Translation(new Point(100 / this.frameRate, 50 / this.frameRate)));

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
        drawing.frameCounter++;

        var fish = <DrawLines>drawing.drawWorld.findDrawElement("fish");

        if (fish != null) {
            var bounds = fish.bounds();

            if (bounds.max.x > drawing.width || bounds.min.x < 0) {
                var transformation = <Translation>drawing.drawWorld.findDrawTransformation(fish);

                transformation.translation.x *= -1;     // Adjust the reference.

                // Flip the fish!

                fish.transform(new ReflectionAboutVerticalLine(bounds.cloneRectangle().center.x));
            }

            if (bounds.max.y > drawing.height || bounds.min.y < 0) {
                var transformation = <Translation>drawing.drawWorld.findDrawTransformation(fish);

                transformation.translation.y *= -1;     // Adjust the reference.
            }
        }

        var ball = <DrawCircle>drawing.drawWorld.findDrawElement("ball");

        if (ball != null) {
            var bounds = ball.bounds();

            if (bounds.max.x > drawing.width || bounds.min.x < 0) {
                var transformation = <Translation>drawing.drawWorld.findDrawTransformation(ball);

                transformation.translation.x *= -1;     // Adjust the reference.
            }

            if (bounds.max.y > drawing.height || bounds.min.y < 0) {
                var transformation = <Translation>drawing.drawWorld.findDrawTransformation(ball);

                transformation.translation.y *= -1;     // Adjust the reference.
            }
        }

        // So far, this is fast enough to clear and redraw the entire frame. (even on my crappy i5, I need to test on a phone too)

        drawing.drawWorld.animateFrame();
        drawing.clearCanvas();
        drawing.drawWorld.draw(drawing.context);
    }
}