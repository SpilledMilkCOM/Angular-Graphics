import { ITransformation } from './ITransformation';
import { IRect } from './IRect';

// All things being drawn to the canvas should implement this interface.
export interface IDrawElement {

    bounds(): IRect;
    
    clone(): IDrawElement;

    draw(context: CanvasRenderingContext2D): void;

    transform(transformation: ITransformation): void;
}