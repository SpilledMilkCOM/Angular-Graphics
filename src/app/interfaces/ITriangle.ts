import { ILineArray } from './ILineArray';

export interface ITriangle {
    lines: ILineArray;

    clone(): ITriangle;
}