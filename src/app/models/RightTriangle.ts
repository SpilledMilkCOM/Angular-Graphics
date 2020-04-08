import { IPoint } from '../interfaces/IPoint';
import { ISize } from '../interfaces/ISize';
import { ITriangle } from '../interfaces/ITriangle';
import { ILineArray } from '../interfaces/ILineArray';
import { Lines } from './Lines';
import { Point } from './Point';

export class RightTriangle implements ITriangle {

    // Adds more memory, but less compute when cloning. (may take this out later)
    center: IPoint;
    segments: ILineArray;
    size: ISize;

    constructor(center: IPoint, size: ISize)
    {
        this.center = center;
        this.size = size;

        this.segments = new Lines();

        var topLeft = new Point(center.x - size.width / 2, center.y - size.height / 2);

        this.segments.addPoint(topLeft);
        this.segments.addPoint(new Point(topLeft.x, topLeft.y + size.height));
        this.segments.addPoint(new Point(topLeft.x + size.width, topLeft.y + size.height));
    }

    clone(): ITriangle
    {
        return new RightTriangle(this.center.clone(), this.size.clone());
    }
}