import { IVector } from '../interfaces/IVector';
import { IPoint } from '../interfaces/IPoint';
import { Point } from './Point';

export class Vector implements IVector {
    point: IPoint;

    constructor(point: IPoint) {
        this.point = point;
    }

    add(vector: IVector): IVector {
        // Do NOT change the internal point.

        return new Vector(new Point(this.point.x + vector.point.x, this.point.y + vector.point.y));
    }

    clone(): IVector {
        return new Vector(this.point.clone());
    }

    distance(vector: IVector): number {
        // Is this "cheaper" than calling the Math.pow(x, 2) method?
        var diffX = this.point.x - vector.point.x;
        var diffY = this.point.y - vector.point.y;

        return Math.sqrt(diffX * diffX + diffY * diffY);
    }

    multiply(vector: IVector): IVector {
        // Do NOT change the internal point.

        return new Vector(new Point(this.point.x * vector.point.x, this.point.y * vector.point.y));
    }

    // _|_ is the negative reciprocal
    perpendicular(): IVector {
        return new Vector(new Point(-1 * this.point.y, this.point.x));
    }

    set(vector: IVector): IVector {
        // Changing the internal structure (without cloning)

        this.point.x = vector.point.x;
        this.point.y = vector.point.y;

        return this;
    }
}