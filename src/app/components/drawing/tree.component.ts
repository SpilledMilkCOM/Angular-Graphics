import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { DrawTreeFractal } from 'src/app/fractals/DrawTreeFractal';
import { DrawViewport } from '../../models/draw/DrawViewport';
import { DrawWorld } from '../../models/draw/DrawWorld';
import { Line } from 'src/app/models/Line';
import { Point } from '../../models/Point';

// TODO: combine the interface component, and split out the fractal component.

@Component({
    selector: 'gr-tree-fractal'
    , templateUrl: './tree.component.html'
})
export class TreeFractalComponent implements AfterViewInit {

    @ViewChild('treeId')
    private canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    private origHeight: number = 600;
    private origWidth: number = 600;

    elapsedMilliseconds: number = 0;
    level: number = 6;
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

            // Test dragon fractal

            drawWorld.addElement(new DrawTreeFractal(new Line(new Point(300, 0), new Point(300, 250)), this.level), "tree");
            drawWorld.draw(this.context);

            var foundElement = drawWorld.findDrawElement("tree");

            this.segments = (<DrawTreeFractal>foundElement).segments();
            this.elapsedMilliseconds = Date.now() - start;
        }
    }
}