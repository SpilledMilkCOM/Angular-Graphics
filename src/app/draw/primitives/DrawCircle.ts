import { ICircle } from 'src/app/models/interfaces/ICircle';
import { IDrawElement } from '../interfaces/IDrawElement';
import { ITransformation } from '../../models/interfaces/ITransformation';

import { Rect } from '../../models/Rect';

export class DrawCircle implements IDrawElement {
    circle: ICircle;
    mass: number;

    constructor(circle: ICircle) {
        this.circle = circle;
        this.mass = Math.PI * this.circle.radius * this.circle.radius;      // Effectively the area for now.
    }
    
    bounds(): Rect {
        var min = this.circle.center.clone();
        var max = min.clone();

        min.x -= this.circle.radius;
        min.y -= this.circle.radius;
        max.x += this.circle.radius;
        max.y += this.circle.radius;

        return new Rect(min, max);
    }
    
    clone(): IDrawElement {
        return new DrawCircle(this.circle.clone());
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