import { IPoint } from './IPoint';
import { ISize } from './ISize';

export interface IRectangle {
    center: IPoint;
    size: ISize;

    clone(): IRectangle;
}