import { IPoint } from './IPoint';
import { ISize } from './ISize';
import { IRect } from './IRect';

export interface IRectangle {
    center: IPoint;
    size: ISize;

    clone(): IRectangle;
    cloneRect(): IRect;
}