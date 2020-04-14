import { IDrawElement } from '../interfaces/IDrawElement';
import { ILine } from '../../models/interfaces/ILine';
import { ITransformation } from '../../models/interfaces/ITransformation';
import { IRect } from 'src/app/models/interfaces/IRect';

import { Rect } from '../../models/Rect';

export class DrawLine implements IDrawElement {

    line: ILine;

    constructor(line: ILine)
    {
        this.line = line;
    }

    bounds(): IRect {
        var max = this.line.end.clone();
        var min = this.line.start.clone();

        max.x = Math.max(max.x, min.x);
        max.y = Math.max(max.y, min.y);
        min.x = Math.min(max.x, min.x);
        min.y = Math.min(max.y, min.y);

        return new Rect(min, max);
    }

    clone(): IDrawElement {
        return new DrawLine(this.line.clone());
    }

    draw(context: CanvasRenderingContext2D): void
    {
        context.beginPath();
        context.moveTo(this.line.start.x, this.line.start.y);
        context.lineTo(this.line.end.x, this.line.end.y);
        context.stroke();
    }

    transform(transformation: ITransformation): void
    {
        transformation.transform(this.line.start);
        transformation.transform(this.line.end);
    }
}