import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { DrawRectangle } from '../../draw/primitives/DrawRectangle';
import { DrawViewport } from '../../draw/DrawViewport';
import { DrawWorld } from '../../draw/DrawWorld';

import { Point } from '../../models/Point';
import { Rectangle } from '../../models/Rectangle';
import { Size } from '../../models/Size';

@Component({
    selector: 'gr-spokes'
    , templateUrl: './spokes.component.html'
})
export class SpokesComponent implements AfterViewInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    height: number = 600;
    width: number = 600;

    drawWorld: DrawWorld;

    ngAfterViewInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

        var closedLoop = true;

        this.context = this.canvas.nativeElement.getContext("2d");

        var drawViewport = new DrawViewport(this.context);
        var drawWorld = new DrawWorld(null, drawViewport);

         drawWorld.addElement(new DrawRectangle(new Rectangle(new Point(drawViewport.size.width / 2, drawViewport.size.height / 2), new Size(drawViewport.size.width, drawViewport.size.height))));

        // Test right triangle

        drawWorld.draw(this.context);

        this.drawWorld = drawWorld;
    }

    onResize(event) {
        // The canvas is based on the width and height

        this.width = event.target.innerWidth - 20;
        this.height = event.target.innerHeight - 215;

        this.ngAfterViewInit();
    }
}