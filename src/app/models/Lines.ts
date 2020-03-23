import { IPoint } from '../interfaces/IPoint';
import { ILineArray } from '../interfaces/ILineArray';

export class Lines implements ILineArray {
    points: IPoint[];

    constructor()
    {
        this.points = new Array<IPoint>();
    }

    addPoint(point: IPoint)
    {
        this.points.push(point);
    }

    clone(): ILineArray {
        var clone = new Lines();

        this.points.forEach(element => clone.addPoint(element.clone()));

        return clone;
    }
}