import { IDrawElement } from '../../interfaces/IDrawElement';
import { IDrawViewport } from '../../interfaces/IDrawViewport';
import { IDrawWorld } from '../../interfaces/IDrawWorld';
import { IPoint } from '../../interfaces/IPoint';
import { ITransformation } from '../../interfaces/ITransformation';

export class DrawWorld implements IDrawWorld, IDrawElement {

    animatedElements: Map<IDrawElement, ITransformation>;
    elements: IDrawElement[];
    namedElements: Map<String, IDrawElement>;
    viewport: IDrawViewport;

    constructor(elements: IDrawElement[], viewport: IDrawViewport) {
        this.animatedElements = new Map<IDrawElement, ITransformation>();

        // Poor-man's coalesce (I remember doing this WAAAAY back)

        this.elements = elements != null ? elements : new Array<IDrawElement>();
        this.namedElements = new Map<String, IDrawElement>();
        this.viewport = viewport;
    }

    /** Add an element to the world
     * 
     * @param element The element being added to the world.
     * @param name The name of the element.
     * @param frameTransform A transformation during one frame of animation. 
     */
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

    addTransformation(name: String = null, frameTransform: ITransformation): void {
        var element = this.findDrawElement(name);

        if (element != null) {
            if (frameTransform == null) {
                this.animatedElements.delete(element);
            }
            else {
                this.animatedElements.set(element, frameTransform);
            }
        }
    }

    animateFrame() {
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
        this.draw(context);
    }

    findDrawElement(name: String): IDrawElement {
        return this.namedElements.get(name);
    }
    
    findDrawTransformation(element: IDrawElement): ITransformation {
        return this.animatedElements.get(element);
    }

    /** Transform a point to the world's viewport coordinates
     * 
     * @remarks
     * 
     * @param point - The point to transform to the viewport coordinates (transforms the reference)
     * 
     * @returns - A reference to the point parameter.
     */
    toViewport(point: IPoint): IPoint {
        this.viewport.transformation.transform(point);

        return point;
    }

    /** Transform all of the world's elements.
     * 
     * @param transformation - The transformation to apply
     */
    transform(transformation: ITransformation): void {
        this.elements.forEach(element => element.transform(transformation));
    }

}