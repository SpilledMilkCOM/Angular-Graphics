import { IDrawElement } from '../../interfaces/IDrawElement';
import { IDrawViewport } from '../../interfaces/IDrawViewport';
import { IDrawWorld } from 'src/app/interfaces/IDrawWorld';
import { ITransformation } from 'src/app/interfaces/ITransformation';
import { Input } from '@angular/core';

export class DrawWorld implements IDrawWorld, IDrawElement {

    elements: IDrawElement[];
    viewport: IDrawViewport;

    //timer: NodeJS.Timer;

    constructor(elements: IDrawElement[], viewport: IDrawViewport) {
        // Poor-mans coalesce (I remember doing this WAAAAY back)
        this.elements = elements != null ? elements : new Array<IDrawElement>();
        this.viewport = viewport;
    }

    addElement(element: IDrawElement): void {
        var clone = element.clone();

        clone.transform(this.viewport.transformation);

        this.elements.push(clone);
    }

    clone(): IDrawElement {
        throw new Error("Cannot clone the world (for now).");
    }

    draw(context: CanvasRenderingContext2D): void {
        this.elements.forEach(element => element.draw(context));
    }

    drawFrame(context: CanvasRenderingContext2D) {
        // Move things that move.

        this.draw(context);
    }

    transform(transformation: ITransformation): void {
        this.elements.forEach(element => element.transform(transformation));
    }
}