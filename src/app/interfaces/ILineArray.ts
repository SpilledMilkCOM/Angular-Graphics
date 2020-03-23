import { IPoint } from './IPoint';

export interface ILineArray {
    points: IPoint[];

    clone(): ILineArray;
}