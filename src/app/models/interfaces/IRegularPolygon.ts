import { IPoint } from './IPoint';
import { ILineArray } from './ILineArray';

export interface IRegularPolygon {
    center: IPoint;
    radius: number;
    segments: ILineArray;
    sides: number;

    clone(): IRegularPolygon;
}