import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild } from "@angular/core";
import { DrawDragonFractal } from 'src/app/fractals/DrawDragonFractal';
import { DrawWorld } from '../../models/draw/DrawWorld';
import { DrawViewport } from '../../models/draw/DrawViewport';
import { Line } from '../../models/Line';
import { Point } from '../../models/Point';

@Component({
    selector: 'gr-fractal'
    , templateUrl: './dragon.component.html'
})
export class FractalComponent implements AfterViewInit {

    @ViewChild('dragonId')
    private canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    private origHeight: number = 600;
    private origWidth: number = 600;

    @Input() level: number = 10;

    @Output() elapsedMilliseconds: number = 0;
    @Output() segments: number = 0;

    public clearCanvas() {
        var start = Date.now();

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.segments = 0;
        this.elapsedMilliseconds = Date.now() - start;
    }

    public ngAfterViewInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

        this.context = this.canvas.nativeElement.getContext("2d");

        this.refreshFractal();
    }

    public onEnter(value: string) {
        this.level = Number(value);
        this.refreshFractal();
    }

    private refreshFractal() {

        if (this.level >= 0 && this.level < 20) {

            var start = Date.now();

            var drawViewport = new DrawViewport(this.context);
            var drawWorld = new DrawWorld(null, drawViewport);

            // Test dragon fractal

            drawWorld.addElement(new DrawDragonFractal(new Line(new Point(200, 300), new Point(500, 300)), this.level));

            drawWorld.draw(this.context);

            this.segments = Math.pow(2, this.level);
            this.elapsedMilliseconds = Date.now() - start;
        }
    }
}