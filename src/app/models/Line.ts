import { ILine } from '../interfaces/ILine';
import { IPoint } from '../interfaces/IPoint';

export class Line implements ILine {
    start: IPoint;
    end: IPoint;

    constructor(start: IPoint, end: IPoint)
    {
        this.start = start;
        this.end = end;
    }

    clone(): ILine {
        return new Line(this.start, this.end);
    }
}