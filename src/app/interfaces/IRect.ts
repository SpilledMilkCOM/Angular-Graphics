import { IPoint } from './IPoint';
import { IRectangle } from './IRectangle';

export interface IRect {
    min: IPoint;
    max: IPoint;

    clone(): IRect;
    cloneRectangle(): IRectangle;
}