import { IPoint } from './IPoint';

export interface ILineArray {
    points: IPoint[];

    addPoint(point: IPoint);
    addPoints(points: IPoint[]);
    clone(): ILineArray;
}