import { IDrawElement } from '../../interfaces/IDrawElement';
import { IDrawViewport } from '../../interfaces/IDrawViewport';
import { IDrawWorld } from '../../interfaces/IDrawWorld';
import { ITransformation } from '../../interfaces/ITransformation';

export class DrawWorld implements IDrawWorld, IDrawElement {

    elements: IDrawElement[];
    namedElements: Map<String, IDrawElement>;
    viewport: IDrawViewport;

    constructor(elements: IDrawElement[], viewport: IDrawViewport) {
        // Poor-mans coalesce (I remember doing this WAAAAY back)
        this.elements = elements != null ? elements : new Array<IDrawElement>();
        this.namedElements  = new Map<String, IDrawElement>();
        this.viewport = viewport;
    }

    addElement(element: IDrawElement, name: String = null): void {
        var clone = element.clone();

        clone.transform(this.viewport.transformation);

        this.elements.push(clone);

        if (name != null) {
            this.namedElements.set(name, clone);
        }
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

    findDrawElement(name: String): IDrawElement {
        return this.namedElements.get(name);
    }

    transform(transformation: ITransformation): void {
        this.elements.forEach(element => element.transform(transformation));
    }
}