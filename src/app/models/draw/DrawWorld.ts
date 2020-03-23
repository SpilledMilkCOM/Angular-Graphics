import { IDrawElement } from '../../interfaces/IDrawElement';
import { IDrawViewport } from '../../interfaces/IDrawViewport';
import { IDrawWorld } from 'src/app/interfaces/IDrawWorld';
import { ITransformation } from 'src/app/interfaces/ITransformation';

export class DrawWorld implements IDrawWorld, IDrawElement {

    elements: IDrawElement[];
    viewport: IDrawViewport;

    constructor(elements: IDrawElement[], viewport: IDrawViewport)
    {
        // Poor-mans coalesce (I remember doing this WAAAAY back)
        this.elements = elements != null ? elements : new Array<IDrawElement>();
        this.viewport = viewport;
    }
    
    addElement(element: IDrawElement): void
    {
        var clone = element.clone();

        clone.transform(this.viewport.transformation);

        this.elements.push(clone);
    }

    clone(): IDrawElement
    {
        throw new Error("Cannot clone the world (for now).");
    }

    draw(context: CanvasRenderingContext2D): void
    {
        this.elements.forEach(element => element.draw(context));
    }

    transform(transformation: ITransformation): void
    {
        this.elements.forEach(element => element.transform(transformation));
    }
}