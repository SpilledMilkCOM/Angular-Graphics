import { IDrawElement } from '../../interfaces/IDrawElement';
import { ILineArray } from '../../interfaces/ILineArray';
import { ITransformation } from '../../interfaces/ITransformation';
import { Rectangle } from '../Rectangle';
import { Point } from '../Point';
import { Size } from '../Size';

export class DrawLines implements IDrawElement {

    closedLoop: boolean;        // Support a "closed" shape.

    public lines: ILineArray;   // TODO: How to make this "readonly"

    constructor(lines: ILineArray, closedLoop: boolean = false) {
        this.closedLoop = closedLoop;
        this.lines = lines;
    }

    bounds(): Rectangle {
        var min = this.lines.points[0].clone();
        var max = min.clone();
        var first = true;

        this.lines.points.forEach(point => {
            if (!first) {
                min.x = Math.min(min.x, point.x);
                min.y = Math.min(min.y, point.y);
                max.x = Math.max(max.x, point.x);
                max.y = Math.max(max.y, point.y);
            }

            first = false;
        });

        return new Rectangle(new Point((max.x + min.x) / 2, (max.y + min.y) / 2), new Size(max.x - min.x, max.y - min.y));
    }

    clone(): IDrawElement {
        return new DrawLines(this.lines.clone(), this.closedLoop);
    }

    draw(context: CanvasRenderingContext2D): void {
        // Has at least 2 points to make a line.

        if (this.lines.points.length > 1) {
            context.beginPath();
            context.moveTo(this.lines.points[0].x, this.lines.points[0].y);

            var skipCount = 1;

            this.lines.points.forEach(element => {
                if (skipCount == 0) {
                    context.lineTo(element.x, element.y);
                }
                else {
                    skipCount--;
                }
            });

            if (this.closedLoop) {
                context.closePath();
            }

            context.stroke();
        }
    }

    transform(transformation: ITransformation): void {
        this.lines.points.forEach(point => transformation.transform(point));
    }
}