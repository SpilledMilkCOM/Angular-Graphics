import { ITransformation } from '../../models/interfaces/ITransformation';
import { IRect } from '../../models/interfaces/IRect';

// All things being drawn to the canvas should implement this interface.
export interface IDrawElement {

    bounds(): IRect;
    
    clone(): IDrawElement;

    draw(context: CanvasRenderingContext2D): void;

    transform(transformation: ITransformation): void;
}