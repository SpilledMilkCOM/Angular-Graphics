import { IDrawElement } from '../interfaces/IDrawElement';
import { IPoint } from '../../models/interfaces/IPoint';
import { IRect } from 'src/app/models/interfaces/IRect';
import { IRectangle } from '../../models/interfaces/IRectangle';
import { ISize } from '../../models/interfaces/ISize';
import { ITransformation } from '../../models/interfaces/ITransformation';

import { Point } from '../../models/Point';

export class DrawRectangle implements IDrawElement {
    rectangle: IRectangle;

    topLeft: IPoint;
    size: ISize;

    constructor(rectangle: IRectangle) {
        this.rectangle = rectangle;

        this.topLeft = new Point(this.rectangle.center.x - this.rectangle.size.width / 2
            , this.rectangle.center.y + this.rectangle.size.height / 2);

        this.size = rectangle.size.clone();
    }

    bounds(): IRect {
        return this.rectangle.cloneRect();
    }

    clone(): IDrawElement {
        return new DrawRectangle(this.rectangle.clone());
    }

    draw(context: CanvasRenderingContext2D): void {
        context.strokeRect(this.topLeft.x, this.topLeft.y, this.size.width, this.size.height);
    }

    transform(transformation: ITransformation): void {
        transformation.transform(this.topLeft);
    }
}