import { ICircle } from 'src/app/interfaces/ICircle';
import { IDrawElement } from '../../interfaces/IDrawElement';
import { ITransformation } from '../../interfaces/ITransformation';

export class DrawCircle implements IDrawElement {
    circle: ICircle;

    constructor(circle: ICircle) {
        this.circle = circle;
    }

    clone(): IDrawElement {
        var clone = new DrawCircle(this.circle.clone());

        return clone;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.arc(this.circle.center.x, this.circle.center.y, this.circle.radius, 0, 2 * Math.PI);
        context.stroke();
    }

    transform(transformation: ITransformation): void {
        transformation.transform(this.circle.center);
    }
}