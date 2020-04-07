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

@Component({
    selector: 'gr-drawing'
    , templateUrl: './drawing.component.html'
})
export class DrawingComponent implements AfterViewInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    origHeight: number = 600;
    origWidth: number = 600;

    buttonText: string = "Start";
    frameCounter: number = 0;
    frameRate: number = 10;                 // Frames per second.
    timer: any;
    drawWorld: DrawWorld;

    ngAfterViewInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

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

        drawWorld.addElement(new DrawLine(new Line(new Point(0, 0), new Point(150, 150))));
        drawWorld.addElement(new DrawLine(new Line(new Point(0, 0), new Point(drawViewport.size.width, 0))));
        drawWorld.addElement(new DrawLine(new Line(new Point(0, 0), new Point(0, drawViewport.size.height))));

        // Test points

        drawWorld.addElement(new DrawPoint(new Point(300, 300)));
        drawWorld.addElement(new DrawPoint(new Point(300, 310)));
        drawWorld.addElement(new DrawPoint(new Point(310, 300)));
        drawWorld.addElement(new DrawPoint(new Point(310, 310)));

        // Test rectangle

        drawWorld.addElement(new DrawRectangle(new Rectangle(new Point(200, 300), new Size(10, 10))));

        // Test right triangle

        drawWorld.addElement(new DrawLines(new RightTriangle(new Point(200, 400), new Size(30, 30)).lines, closedLoop));

        // Test circle

        drawWorld.addElement(new DrawCircle(new Circle(new Point(400, 400), 30)));

        drawWorld.draw(this.context);

        this.drawWorld = drawWorld;
    }

    public toggleAnimation(context: CanvasRenderingContext2D): void {

        if (this.buttonText == "Start") {
            this.buttonText = "Stop";
            this.timer = setInterval(this.drawFrame, 1000 / this.frameRate, this);
        }
        else {
            this.buttonText = "Start";
            clearInterval(this.timer);
        }
    }

    private drawFrame(drawing: DrawingComponent): void {
        drawing.frameCounter++;

        var spaceship = drawing.drawWorld.findDrawElement("spaceship");

        if (spaceship != null) {
            //spaceship.transform(new Translation(new Point(1, -4)));

            var lines = <DrawLines>spaceship;

            //spaceship.transform(new Rotation(Math.PI / 90, lines.lines.points[3]));
            spaceship.transform(new Rotation(Math.PI / 90, new Point(-300, -300)));
        }

        drawing.drawWorld.draw(drawing.context);
    }
}