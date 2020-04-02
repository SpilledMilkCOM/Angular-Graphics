import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { DrawDragonFractal } from 'src/app/fractals/DrawDragonFractal';
import { DrawWorld } from '../../models/draw/DrawWorld';
import { DrawViewport } from '../../models/draw/DrawViewport';
import { Line } from '../../models/Line';
import { Point } from '../../models/Point';

@Component({
    selector: 'gr-fractal'
    , template: '<canvas #dragonId width="600" height="600">Canvas not supported.</canvas>'
})
export class FractalComponent implements AfterViewInit {

    @ViewChild('dragonId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    origHeight: number = 600;
    origWidth: number = 600;

    ngAfterViewInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

        this.context = this.canvas.nativeElement.getContext("2d");

        var drawViewport = new DrawViewport(this.context);
        var drawWorld = new DrawWorld(null, drawViewport);

        // Test dragon fractal

        drawWorld.addElement(new DrawDragonFractal(new Line(new Point(200, 300), new Point(500, 300)), 17));

        drawWorld.draw(this.context);
    }
}