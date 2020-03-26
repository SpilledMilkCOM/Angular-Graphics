import { IDrawElement } from '../../interfaces/IDrawElement';
import { IPoint } from '../../interfaces/IPoint';
import { ITransformation } from '../../interfaces/ITransformation';

export class DrawPoint implements IDrawElement {

    point: IPoint;

    constructor(point: IPoint)
    {
        this.point = point;
    }

    clone(): IDrawElement {
        return new DrawPoint(this.point.clone());
    }

    draw(context: CanvasRenderingContext2D): void
    {
        context.beginPath();
        context.moveTo(this.point.x, this.point.y);
        context.lineTo(this.point.x + 1, this.point.y);     // TODO: Draws a "tick" mark, may want to change this to a circle.
        context.stroke();
    }

    transform(transformation: ITransformation): void
    {
        transformation.transform(this.point);
    }
}