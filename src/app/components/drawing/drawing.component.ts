import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Lines } from '../../models/Lines';
import { Point } from '../../models/Point';
import { DrawLines } from '../../models/draw/DrawLines';
import { DrawWorld } from '../../models/draw/DrawWorld';
import { DrawViewport } from '../../models/draw/DrawViewport';
import { DrawLine } from '../../models/draw/DrawLine';
import { Line } from '../../models/Line';
import { DrawPoint } from 'src/app/models/draw/DrawPoint';
import { DrawRectangle } from 'src/app/models/draw/DrawRectangle';
import { Rectangle } from 'src/app/models/Rectangle';
import { Size } from 'src/app/models/Size';

@Component({
      selector: 'gr-drawing'
    , template: '<canvas #canvasId width="600" height="600">Canvas not supported.</canvas>'
})
export class DrawingComponent implements OnInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    origHeight: number = 600;
    origWidth: number = 600;

    ngOnInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

        this.context = this.canvas.nativeElement.getContext("2d");

        var lines = new Lines();

        lines.addPoint(new Point(0,0));
        lines.addPoint(new Point(100,50));
        lines.addPoint(new Point(50,100));
        lines.addPoint(new Point(200,200));

        var drawLines = new DrawLines(lines);
        var drawViewport = new DrawViewport(this.context);
        var drawWorld = new DrawWorld(null, drawViewport);

        // Test many lines

        drawWorld.addElement(drawLines);

        // Test individual lines.

        drawWorld.addElement(new DrawLine(new Line(new Point(100, 100), new Point(300, 100))));
        drawWorld.addElement(new DrawLine(new Line(new Point(0, 0), new Point(drawViewport.size.width, 0))));
        drawWorld.addElement(new DrawLine(new Line(new Point(0, 0), new Point(0, drawViewport.size.height))));

        // Test points

        drawWorld.addElement(new DrawPoint(new Point(300, 300)));
        drawWorld.addElement(new DrawPoint(new Point(300, 310)));
        drawWorld.addElement(new DrawPoint(new Point(310, 300)));
        drawWorld.addElement(new DrawPoint(new Point(310, 310)));

        // Test rectangle

        drawWorld.addElement(new DrawRectangle(new Rectangle(new Point(200, 300), new Size(10, 10))));

        drawWorld.draw(this.context);
    }
}