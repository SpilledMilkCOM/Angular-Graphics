import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { DrawCircle } from 'src/app/draw/primitives/DrawCircle';
import { DrawRectangle } from '../../draw/primitives/DrawRectangle';
import { DrawViewport } from '../../draw/DrawViewport';
import { DrawWorld } from '../../draw/DrawWorld';

import { Circle } from 'src/app/models/Circle';
import { Point } from '../../models/Point';
import { Rectangle } from '../../models/Rectangle';
import { Size } from '../../models/Size';

@Component({
    selector: 'gr-orbits'
    , templateUrl: './orbits.component.html'
})
export class OrbitsComponent implements AfterViewInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    height: number = 600;
    width: number = 1000;

    drawWorld: DrawWorld;
    timer: any;

    ngAfterViewInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

        this.context = this.canvas.nativeElement.getContext("2d");

        this.drawWorld = new DrawWorld(null, new DrawViewport(this.context));;

        this.fillWorld(this);

        this.timer = setInterval(this.animateFrame, 250, this);
    }

    onResize(event) {
        // The canvas is based on the width and height

        this.width = event.target.innerWidth - 20;
        this.height = event.target.innerHeight - 215;

        this.ngAfterViewInit();
    }

    fillWorld(orbits: OrbitsComponent) {
        orbits.drawWorld.clear();
        orbits.clearCanvas();

        var center = new Point(orbits.drawWorld.viewport.size.width / 2, orbits.drawWorld.viewport.size.height / 2);

        orbits.drawWorld.addElement(new DrawRectangle(new Rectangle(center, new Size(orbits.drawWorld.viewport.size.width, orbits.drawWorld.viewport.size.height))));

        const minRadiusInc = 3;
        const maxRadiusInc = 7;
        var radiusInc = orbits.randomInt(minRadiusInc, maxRadiusInc);

        for (var radius = radiusInc; radius < orbits.drawWorld.viewport.size.height / 2; radius += radiusInc) {
            orbits.drawWorld.addElement(new DrawCircle(new Circle(center.clone(), radius)));

            radiusInc = orbits.randomInt(minRadiusInc, maxRadiusInc);
        }

        orbits.drawWorld.draw(orbits.context);
    }

    //----==== PRIVATE ====------------------------------------------------------------------------

    private animateFrame(orbits: OrbitsComponent): void {
        orbits.fillWorld(orbits);
    }
    
    private clearCanvas() {
        // I'm not sure why this.context works within an animateFrame() which is called from a timer.

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    private randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * max) + min;
    }
}