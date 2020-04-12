import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { DrawWorld } from '../../models/draw/DrawWorld';
import { DrawViewport } from '../../models/draw/DrawViewport';
import { Point } from '../../models/Point';
import { DrawKochFractal } from '../../fractals/DrawKochFractal';

// TODO: combine the interface component, and split out the fractal component.

@Component({
    selector: 'gr-koch-fractal'
    , templateUrl: './koch.component.html'
})
export class KochFractalComponent implements AfterViewInit {

    @ViewChild('kochId')
    private canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    private origHeight: number = 600;
    private origWidth: number = 600;

    elapsedMilliseconds: number = 0;
    level: number = 5;
    segments: number = 0;

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

    public levelChanged(value: string) {
        this.level = Number(value);
        this.refreshFractal();
    }

    private refreshFractal() {

        if (this.level >= 0 && this.level < 20) {

            var start = Date.now();

            var drawViewport = new DrawViewport(this.context);
            var drawWorld = new DrawWorld(null, drawViewport);

            var fractal = new DrawKochFractal(new Point(300, 300), 300, this.level);

            drawWorld.addElement(fractal);
            drawWorld.draw(this.context);

            this.segments = fractal.segments();
            this.elapsedMilliseconds = Date.now() - start;
        }
    }
}