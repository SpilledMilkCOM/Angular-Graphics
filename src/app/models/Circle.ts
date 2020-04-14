import { ICircle } from './interfaces/ICircle';
import { IPoint } from './interfaces/IPoint';

export class Circle implements ICircle {
    center: IPoint;
    radius: number;

    constructor(center: IPoint, radius: number)
    {
        this.center = center;
        this.radius = radius;
    }

    clone(): ICircle
    {
        return new Circle(this.center.clone(), this.radius);
    }
}