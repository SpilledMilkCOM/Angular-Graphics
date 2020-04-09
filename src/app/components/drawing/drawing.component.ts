import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { DrawCircle } from 'src/app/models/draw/DrawCircle';
import { DrawLine } from '../../models/draw/DrawLine';
import { DrawLines } from '../../models/draw/DrawLines';
import { DrawPoint } from '../../models/draw/DrawPoint';
import { DrawRectangle } from '../../models/draw/DrawRectangle';
import { DrawViewport } from '../../models/draw/DrawViewport';
import { DrawWorld } from '../../models/draw/DrawWorld';

import { Circle } from 'src/app/models/Circle';
import { Line } from '../../models/Line';
import { Lines } from '../../models/Lines';
import { Point } from '../../models/Point';
import { Rectangle } from '../../models/Rectangle';
import { RightTriangle } from '../../models/RightTriangle';
import { Size } from '../../models/Size';
import { Translation } from 'src/app/models/transform/Translation';
import { Rotation } from 'src/app/models/transform/Rotation';
import { RegularPolygon } from 'src/app/primitives/RegularPolygon';

@Component({
    selector: 'gr-drawing'
    , templateUrl: './drawing.component.html'
})
export class DrawingComponent implements AfterViewInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    height: number = 600;
    width: number = 600;

    buttonText: string = "Start";
    elapsedMilliseconds: number = 0;
    frameCounter: number = 0;
    frameRate: number = 10;                 // Frames per second.
    timer: any;
    drawWorld: DrawWorld;

    public clearCanvas() {
        var start = Date.now();

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        //this.frameCounter = 0;
        this.elapsedMilliseconds = Date.now() - start;
    }

    ngAfterViewInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

        var start = Date.now();

        var closedLoop = true;

        this.context = this.canvas.nativeElement.getContext("2d");

        var drawViewport = new DrawViewport(this.context);
        var drawWorld = new DrawWorld(null, drawViewport);

        // Test many lines (spaceship)

        var lines = new Lines();

        lines.addPoint(new Point(200, 200));
        lines.addPoint(new Point(250, 300));
        lines.addPoint(new Point(300, 200));
        lines.addPoint(new Point(250, 225));

        var drawLines = new DrawLines(lines, closedLoop);

        drawWorld.addElement(drawLines, "spaceship");

        // Test individual lines (x & y axes)

        drawWorld.addElement(new DrawLine(new Line(new Point(0, 0), new Point(200, 200))));
        drawWorld.addElement(new DrawLine(new Line(new Point(400, 400), new Point(600, 600))));

        // Test points

        drawWorld.addElement(new DrawPoint(new Point(300, 300)));
        drawWorld.addElement(new DrawPoint(new Point(300, 310)));
        drawWorld.addElement(new DrawPoint(new Point(310, 300)));
        drawWorld.addElement(new DrawPoint(new Point(310, 310)));

        // Test rectangle

        drawWorld.addElement(new DrawRectangle(new Rectangle(new Point(500, 300), new Size(100, 10))));
        drawWorld.addElement(new DrawRectangle(new Rectangle(new Point(75, 75), new Size(100, 100))));
        drawWorld.addElement(new DrawRectangle(new Rectangle(new Point(drawViewport.size.width / 2, drawViewport.size.height / 2), new Size(drawViewport.size.width, drawViewport.size.height))));

        // Test right triangle

        drawWorld.addElement(new DrawLines(new RightTriangle(new Point(200, 400), new Size(30, 30)).segments, closedLoop));

        // Test circle

        drawWorld.addElement(new DrawCircle(new Circle(new Point(400, 400), 30)));

        // Test regular polygon

        drawWorld.addElement(new DrawLines(new RegularPolygon(new Point(400, 100), 30, 3).segments, closedLoop));
        drawWorld.addElement(new DrawLines(new RegularPolygon(new Point(450, 100), 30, 5).segments, closedLoop));
        drawWorld.addElement(new DrawLines(new RegularPolygon(new Point(500, 100), 30, 8).segments, closedLoop), "stopsign");

        drawWorld.draw(this.context);

        this.drawWorld = drawWorld;
        this.elapsedMilliseconds = Date.now() - start;
    }

    onResize(event) {
        this.width = event.target.innerWidth - 30;
        this.height = event.target.innerHeight - 250;

        this.drawWorld.draw(this.context);

        //this.ngAfterViewInit();
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

    private animateFrame(drawing: DrawingComponent): void {
        drawing.frameCounter++;

        var spaceship = drawing.drawWorld.findDrawElement("spaceship");

        if (spaceship != null) {
            spaceship.transform(new Translation(new Point(1, -4)));

            var lines = <DrawLines>spaceship;

            spaceship.transform(new Rotation(Math.PI / 90, lines.lines.points[3]));
        }

        var stopsign = drawing.drawWorld.findDrawElement("stopsign");

        if (stopsign != null) {
            var lines = <DrawLines>stopsign;

            stopsign.transform(new Rotation(Math.PI / 90, lines.lines.points[3]));
        }

        // So far, this is fast enough to clear and redraw the entire frame. (even on my crappy i5, I need to test on a phone too)

        drawing.clearCanvas();
        drawing.drawWorld.draw(drawing.context);
    }
}