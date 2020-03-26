import { IDrawElement } from '../../interfaces/IDrawElement';
import { ILineArray } from '../../interfaces/ILineArray';
import { ITransformation } from '../../interfaces/ITransformation';

export class DrawLines implements IDrawElement {

    closedLoop: boolean;        // Support a "closed" shape.
    lines: ILineArray;

    constructor(lines: ILineArray)
    {
        this.lines = lines;
    }

    clone(): IDrawElement {
        return new DrawLines(this.lines.clone());
    }
    
    draw(context: CanvasRenderingContext2D): void
    {
        // Has at least 2 points to make a line.

        if (this.lines.points.length > 1)
        {
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

            if (this.closedLoop)
            {
                context.closePath();
            }
 
             context.stroke();
        }
    }

    transform(transformation: ITransformation): void
    {
        this.lines.points.forEach(point => transformation.transform(point));
    }
}