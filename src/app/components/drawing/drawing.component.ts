import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
      selector: 'gr-drawing'
    , template: '<canvas #canvasId width="600" height="600"></canvas>'
})
export class DrawingComponent implements OnInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    ngOnInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

        this.context = this.canvas.nativeElement.getContext("2d");

        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(this.context.canvas.width, this.context.canvas.height);
        this.context.stroke();
    }
}