import { ITransformation } from './ITransformation';

// All things being drawn to the canvas should implement this interface.
export interface IDrawElement {
    
    clone(): IDrawElement;

    draw(context: CanvasRenderingContext2D): void;

    transform(transformation: ITransformation): void;
}