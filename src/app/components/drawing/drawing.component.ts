import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Lines } from 'src/app/models/Lines';
import { Point } from 'src/app/models/Point';

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

        lines.draw(this.context);

        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(this.context.canvas.width, this.context.canvas.height);
        this.context.stroke();
    }
}