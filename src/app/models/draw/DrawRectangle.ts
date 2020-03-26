import { IDrawElement } from '../../interfaces/IDrawElement';
import { IPoint } from '../../interfaces/IPoint';
import { IRectangle } from '../../interfaces/IRectangle';
import { ISize } from '../../interfaces/ISize';
import { ITransformation } from '../../interfaces/ITransformation';

import { Point } from '../Point';

export class DrawRectangle implements IDrawElement {
    rectangle: IRectangle;

    topLeft: IPoint;
    size: ISize;

    constructor(rectangle: IRectangle) {
        this.rectangle = rectangle;

        this.topLeft = new Point(this.rectangle.center.x - this.rectangle.size.width / 2
                                , this.rectangle.center.y - this.rectangle.size.width / 2);
        this.size = rectangle.size.clone();
    }

    clone(): IDrawElement {
        var clone = new DrawRectangle(this.rectangle.clone());

        return clone;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.strokeRect(this.topLeft.x, this.topLeft.y, this.size.width, this.size.height);
    }

    transform(transformation: ITransformation): void {
        transformation.transform(this.topLeft);
    }
}