import { ILineArray } from './ILineArray';

export interface ITriangle {
    segments: ILineArray;

    clone(): ITriangle;
}