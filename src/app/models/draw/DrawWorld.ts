import { IDrawElement } from '../../interfaces/IDrawElement';
import { IDrawViewport } from '../../interfaces/IDrawViewport';
import { IDrawWorld } from '../../interfaces/IDrawWorld';
import { ITransformation } from '../../interfaces/ITransformation';
import { IPoint } from 'src/app/interfaces/IPoint';

export class DrawWorld implements IDrawWorld, IDrawElement {

    animatedElements: Map<IDrawElement, ITransformation>;
    elements: IDrawElement[];
    namedElements: Map<String, IDrawElement>;
    viewport: IDrawViewport;

    constructor(elements: IDrawElement[], viewport: IDrawViewport) {
        this.animatedElements = new Map<IDrawElement, ITransformation>();
        // Poor-mans coalesce (I remember doing this WAAAAY back)
        this.elements = elements != null ? elements : new Array<IDrawElement>();
        this.namedElements = new Map<String, IDrawElement>();
        this.viewport = viewport;
    }

    addElement(element: IDrawElement, name: String = null, frameTransform: ITransformation = null): void {
        var clone = element.clone();

        clone.transform(this.viewport.transformation);

        this.elements.push(clone);

        if (name != null) {
            this.namedElements.set(name, clone);
        }

        if (frameTransform != null) {
            this.animatedElements.set(clone, frameTransform);
        }
    }

    animateFrame(context: CanvasRenderingContext2D) {
        // The prototype for this forEach is explicit and the function definition needs to be in the exact order.
        this.animatedElements.forEach((value: ITransformation, key: IDrawElement, map: Map<IDrawElement, ITransformation>) => {
            key.transform(value);
        });
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

    // NOTE: changes parameter
    toViewport(point: IPoint): IPoint {
        this.viewport.transformation.transform(point);

        return point;
    }

    transform(transformation: ITransformation): void {
        this.elements.forEach(element => element.transform(transformation));
    }

}