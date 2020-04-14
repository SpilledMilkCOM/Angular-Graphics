import { IPoint } from '../models/interfaces/IPoint';
import { IRegularPolygon } from '../models/interfaces/IRegularPolygon';
import { ILineArray } from '../models/interfaces/ILineArray';
import { Lines } from '../models/Lines';
import { Point } from '../models/Point';

export class RegularPolygon implements IRegularPolygon {
    center: IPoint;
    radius: number;
    segments: ILineArray;
    sides: number;

    constructor(center: IPoint, radius: number, sides: number)
    {
        this.center = center;
        this.radius = radius;

        if (sides < 3)
        {
            sides = 3;
        }

        this.sides = sides;
        this.segments = new Lines();

        this.generateSides();
    }

    clone(): IRegularPolygon
    {
        return new RegularPolygon(this.center.clone(), this.radius, this.sides);
    }

    private generateSides() {
        var arc = Math.PI * 2 / this.sides;

        for (let index = 0; index < this.sides; index++) {
            this.segments.addPoint(new Point(this.radius * Math.cos(arc * index) + this.center.x
                                            , this.radius * Math.sin(arc * index) + this.center.y));
        }
    }
}