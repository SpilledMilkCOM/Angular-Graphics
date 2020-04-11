import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild } from "@angular/core";
import { DrawDragonFractal } from 'src/app/fractals/DrawDragonFractal';
import { DrawWorld } from '../../models/draw/DrawWorld';
import { DrawViewport } from '../../models/draw/DrawViewport';
import { Line } from '../../models/Line';
import { Point } from '../../models/Point';

@Component({
    selector: 'gr-dragon-fractal'
    , templateUrl: './dragon.component.html'
})
export class DragonFractalComponent implements AfterViewInit {

    @ViewChild('dragonId')
    private canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    private origHeight: number = 600;
    private origWidth: number = 600;

    elapsedMilliseconds: number = 0;
    level: number = 10;
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

    public onEnter(value: string) {
        this.level = Number(value);
        this.refreshFractal();
    }

    private refreshFractal() {

        if (this.level >= 0 && this.level < 20) {

            var start = Date.now();

            var drawViewport = new DrawViewport(this.context);
            var drawWorld = new DrawWorld(null, drawViewport);
            var fractal = new DrawDragonFractal(new Line(new Point(200, 300), new Point(500, 300)), this.level);

            drawWorld.addElement(fractal);

            drawWorld.draw(this.context);

            this.segments = fractal.segments();
            this.elapsedMilliseconds = Date.now() - start;
        }
    }
}