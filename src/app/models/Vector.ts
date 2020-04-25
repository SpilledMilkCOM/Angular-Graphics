import { IVector } from './interfaces/IVector';
import { IPoint } from './interfaces/IPoint';
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

    /**
     * A scalar projection of 'this' vector onto the vector parameter.
     * @param vector 
     */
    dot(vector: IVector): number {
        return this.point.x * vector.point.x + this.point.y * vector.point.y;
    }

    identity(): IVector {
        return new Vector(new Point(1, 1));
    }

    /**
     * Find the midpoint between the two points.
     * @param point 
     */
    midpoint(vector: IVector): IVector {
        return new Vector(new Point((vector.point.x + this.point.x) / 2, (vector.point.y + this.point.y) / 2));
    }

    multiply(vector: IVector): IVector {
        // Do NOT change the internal point.

        return new Vector(new Point(this.point.x * vector.point.x, this.point.y * vector.point.y));
    }

    multiplyByConstant(constant: number): IVector {
        // Do NOT change the internal point.

        return new Vector(new Point(this.point.x * constant, this.point.y * constant));
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