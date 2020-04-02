import { Component, ElementRef, AfterViewInit, ViewChild } from "@angular/core";
import { Lines } from '../../models/Lines';
import { Point } from '../../models/Point';
import { DrawLines } from '../../models/draw/DrawLines';
import { DrawWorld } from '../../models/draw/DrawWorld';
import { DrawViewport } from '../../models/draw/DrawViewport';
import { DrawLine } from '../../models/draw/DrawLine';
import { Line } from '../../models/Line';
import { DrawPoint } from '../../models/draw/DrawPoint';
import { DrawRectangle } from '../../models/draw/DrawRectangle';
import { Rectangle } from '../../models/Rectangle';
import { Size } from '../../models/Size';
import { RightTriangle } from '../../models/RightTriangle';
import { Circle } from 'src/app/models/Circle';
import { DrawCircle } from 'src/app/models/draw/DrawCircle';
import { DrawDragonFractal } from 'src/app/fractals/DrawDragonFractal';

@Component({
    selector: 'gr-drawing'
    , template: '<canvas #canvasId width="600" height="600">Canvas not supported.</canvas>'
})
export class DrawingComponent implements AfterViewInit {

    @ViewChild('canvasId')
    canvas : ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    origHeight: number = 600;
    origWidth: number = 600;

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

        // Test dragon fractal

        //drawWorld.addElement(new DrawDragonFractal(new Line(new Point(100, 100), new Point(600, 600)), 3));
        drawWorld.addElement(new DrawDragonFractal(new Line(new Point(200, 300), new Point(500, 300)), 17));

        drawWorld.draw(this.context);
    }
}