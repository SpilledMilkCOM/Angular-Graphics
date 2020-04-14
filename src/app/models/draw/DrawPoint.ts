import { IDrawElement } from '../../interfaces/IDrawElement';
import { IPoint } from '../../interfaces/IPoint';
import { IRect } from 'src/app/interfaces/IRect';
import { ITransformation } from '../../interfaces/ITransformation';

import { Rect } from '../Rect';

export class DrawPoint implements IDrawElement {

    point: IPoint;

    constructor(point: IPoint)
    {
        this.point = point;
    }

    bounds(): IRect {
        return new Rect(this.point.clone(), this.point.clone());
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