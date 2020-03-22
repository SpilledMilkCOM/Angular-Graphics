import { IPoint } from '../interfaces/IPoint';
import { ILineArray } from '../interfaces/ILineArray';

export class Lines implements ILineArray {
    points: IPoint[];

    constructor()
    {
        this.points = new Array<IPoint>();
    }

    addPoint(point: IPoint)
    {
        this.points.concat(point);
    }

    draw(context: CanvasRenderingContext2D): void
    {
        // Has at least 2 points to make a line.

        if (this.points.length > 1)
        {
            context.beginPath();
            context.moveTo(this.points[0].x, this.points[0].y);

            var skipCount = 1;

            this.points.forEach(element => {
                if (skipCount == 0) {
                    context.lineTo(element.x, element.y);
                }
                else {
                    skipCount--;
                }
            });
 
             context.stroke();
        }
    }
}