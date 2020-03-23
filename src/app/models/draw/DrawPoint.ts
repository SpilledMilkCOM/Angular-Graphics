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
    }

    transform(transformation: ITransformation): void
    {
        transformation.transform(this.point);
    }
}