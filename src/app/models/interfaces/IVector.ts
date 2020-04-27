import { IPoint } from './IPoint';

export interface IVector {
    point: IPoint;

    clone(): IVector;
    identity(): IVector;

    // Operators - These should NOT change the internal value of the point, only return a new point
    // (there is no operator overloading in TypeScript)
    // All operators return a point (so they can be chained together)
    add(vector: IVector): IVector;
    dot(vector: IVector): number;
    multiply(vector: IVector): IVector;
    multiplyByConstant(constant: number): IVector;

    distance(vector: IVector): number;
    magnitude(): number;
    midpoint(vector: IVector): IVector;
    perpendicular(): IVector;
    reflect(perpendicular: IVector): IVector
    unitVector(): IVector;

    // Changes this point and returns this point
    // Not sure if chaining is a good idea for "set", but we'll see.
    set(vector: IVector): IVector;
}