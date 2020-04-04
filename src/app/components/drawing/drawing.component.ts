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
    //timer: NodeJS.Timer;

    ngAfterViewInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

        var closedLoop = true;

        this.context = this.canvas.nativeElement.getContext("2d");

        var lines = new Lines();

        lines.addPoint(new Point(200, 200));
        lines.addPoint(new Point(250, 300));
        lines.addPoint(new Point(300, 200));
        lines.addPoint(new Point(250, 225));

        var drawLines = new DrawLines(lines, closedLoop);
        var drawViewport = new DrawViewport(this.context);
        var drawWorld = new DrawWorld(null, drawViewport);

        // Test many lines

        drawWorld.addElement(drawLines);

        // Test individual lines.

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
    }

    toggleAnimation(context: CanvasRenderingContext2D): void {

        if (this.buttonText == "Start") {
            this.buttonText = "Stop";
            //this.timer = setInterval(this.drawFrame, 100, context);
        }
        else {
            this.buttonText = "Start";
        }
    }
}