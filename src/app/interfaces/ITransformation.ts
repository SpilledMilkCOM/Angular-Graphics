import { IPoint } from './IPoint';

// REF: https://www.mathsisfun.com/geometry/transformations.html

export interface ITransformation
{
    clone(): ITransformation;
    transform(point: IPoint): void;
}