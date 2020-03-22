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

    draw(context: CanvasRenderingContext2D): void
    {
        context.beginPath();
        context.moveTo(this.start.x, this.start.y);
        context.lineTo(this.end.x, this.end.x);
        context.stroke();
    }
}