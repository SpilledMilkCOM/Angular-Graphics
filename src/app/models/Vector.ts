import { IVector } from './interfaces/IVector';
import { IPoint } from './interfaces/IPoint';
import { Point } from './Point';

export class Vector implements IVector {
    point: IPoint;

    constructor(point: IPoint) {
        this.point = point;
    }

    public abs(): IVector {
        return new Vector(new Point(Math.abs(this.point.x), Math.abs(this.point.y)));
    }

    public add(vector: IVector): IVector {
        // Do NOT change the internal point.

        return new Vector(new Point(this.point.x + vector.point.x, this.point.y + vector.point.y));
    }

    public clone(): IVector {
        return new Vector(this.point.clone());
    }

    public distance(vector: IVector): number {
        // Is this "cheaper" than calling the Math.pow(x, 2) method?
        var diffX = this.point.x - vector.point.x;
        var diffY = this.point.y - vector.point.y;

        return Math.sqrt(diffX * diffX + diffY * diffY);
    }

    public magnitude(): number {
        return Math.sqrt(this.point.x * this.point.x + this.point.y * this.point.y);
    }

    /**
     * A scalar projection of 'this' vector onto the vector parameter.
     * @param vector 
     */
    public dot(vector: IVector): number {
        return this.point.x * vector.point.x + this.point.y * vector.point.y;
    }

    /**
     * The identity vector (1, 1)
     */
    public identity(): IVector {
        return new Vector(new Point(1, 1));
    }

    /**
     * Find the midpoint between the two points.
     * @param point 
     */
    public midpoint(vector: IVector): IVector {
        return new Vector(new Point((vector.point.x + this.point.x) / 2, (vector.point.y + this.point.y) / 2));
    }

    public multiply(vector: IVector): IVector {
        // Do NOT change the internal point.

        return new Vector(new Point(this.point.x * vector.point.x, this.point.y * vector.point.y));
    }

    public multiplyByConstant(constant: number): IVector {
        // Do NOT change the internal point.

        return new Vector(new Point(this.point.x * constant, this.point.y * constant));
    }

    // _|_ is the negative reciprocal
    public perpendicular(): IVector {
        return new Vector(new Point(-1 * this.point.y, this.point.x));
    }

    public round(decimals: number): IVector {
        var precision = Math.pow(0.1, decimals);

        return new Vector(new Point(Math.round(this.point.x / precision) * precision, Math.round(this.point.y / precision) * precision));
    }

    /**
     * Reflect this vector about a vector.
     * 
     * REF: https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
     *      r = d − 2 * (d ⋅ n) * n
     *      where:
     *          d - this vector
     *          n - perpendicular unit vector of the reflected line
     *          (d ⋅ n) is the dot product, and n must be normalized.
     * 
     * @param perpendicular - The perpendicular unit vector about which this vector is reflected.
     */
    public reflect(perpendicular: IVector): IVector {
        return this.add(perpendicular.multiplyByConstant(-2 * perpendicular.dot(this)));
    }

    public set(vector: IVector): IVector {
        // Changing the internal structure (without cloning)

        this.point.x = vector.point.x;
        this.point.y = vector.point.y;

        return this;
    }

    /**
     * Retains the same direction of this vector, but with a magnitude of 1.
     * 
     * NOTE: Based on similar triangles and the ratio of their sides.
     */
    public unitVector(): IVector {
        var magnitude = this.magnitude();

        return this.multiplyByConstant(1 / magnitude);
    }

}