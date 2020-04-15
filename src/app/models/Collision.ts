import { ICircle } from './interfaces/ICircle';
import { ICollision } from './interfaces/ICollision';
import { Vector } from './Vector';

export class Collision implements ICollision {
    circle: ICircle;

    constructor(circle: ICircle)
    {
        this.circle = circle;
    }

    clone(): ICollision
    {
        return new Collision(this.circle.clone());
    }

    collidedWith(collision: ICollision): boolean {
        var collisionImp = <Collision>collision;

        //TODO: Might have to do some type checking here "istypeof", etc.

        // The objects have collided when the distance between the centers is less than their combined radii.

        return new Vector(this.circle.center).distance(new Vector(collisionImp.circle.center)) < this.circle.radius + collisionImp.circle.radius;
    }
}