import { ICircle } from './interfaces/ICircle';
import { ICollision } from './interfaces/ICollision';
import { IPoint } from './interfaces/IPoint';
import { Vector } from './Vector';

export class Circle implements ICircle, ICollision {
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

    collision(collision: ICollision): boolean {
        // The objects have collided when the distance between the centers is less than their combined radii.

        return new Vector(this.center).distance(new Vector(collision.center)) < this.radius + collision.radius;
    }
}