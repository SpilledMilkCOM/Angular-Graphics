import { IPoint } from './IPoint';

export interface ICircle {
    center: IPoint;
    radius: number;

    clone(): ICircle;
}