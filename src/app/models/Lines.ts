import { IPoint } from '../interfaces/IPoint';
import { ILineArray } from '../interfaces/ILineArray';

/**
 * An array of points which can be used as a bunch of connected lines.
 */
export class Lines implements ILineArray {
    points: IPoint[];

    /**
     * Construct an empty set of points.
     */
    constructor()
    {
        this.points = new Array<IPoint>();
    }

    /**
     * Add a point.
     * 
     * @param point A point to add to the end of the list of points.
     */
    addPoint(point: IPoint)
    {
        this.points.push(point);
    }

    /**
     * Duplicate this class.
     * 
     * @remarks This is a deep clone with no reference to the previous objects.
     */
    clone(): ILineArray {
        var clone = new Lines();

        this.points.forEach(element => clone.addPoint(element.clone()));

        return clone;
    }
}