import { IPoint } from './interfaces/IPoint';

/**
 * A Point on an X/Y plane
 * 
 * @remarks 
 *  A very light-weight class which only contains coordinate values.
 */
export class Point implements IPoint {
    x: number;
    y: number;

    /**
     * Construct a point with the specified coordinates.
     * 
     * @param x The X coordinate
     * @param y The Y coordinate
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Duplicate the point.
     * 
     * @returns A duplicate of this point
     */
    clone(): IPoint {
        return new Point(this.x, this.y);
    }
}