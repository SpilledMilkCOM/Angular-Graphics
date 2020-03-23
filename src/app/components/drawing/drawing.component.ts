import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Lines } from '../../models/Lines';
import { Point } from '../../models/Point';
import { DrawLines } from '../../models/draw/DrawLines';
import { DrawWorld } from '../../models/draw/DrawWorld';
import { DrawViewport } from '../../models/draw/DrawViewport';
import { DrawLine } from '../../models/draw/DrawLine';
import { Line } from '../../models/Line';

@Component({
      selector: 'gr-drawing'
    , template: '<canvas #canvasId width="600" height="600">Canvas not supported.</canvas>'
})
export class DrawingComponent implements OnInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

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

        drawWorld.addElement(drawLines);
        drawWorld.addElement(new DrawLine(new Line(new Point(100, 100), new Point(300, 100))));
        drawWorld.addElement(new DrawLine(new Line(new Point(0, 0), new Point(drawViewport.size.width, 0))));
        drawWorld.addElement(new DrawLine(new Line(new Point(0, 0), new Point(0, drawViewport.size.height))));

        drawWorld.draw(this.context);
    }
}