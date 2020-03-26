import { IDrawElement } from '../interfaces/IDrawElement';
import { ILine } from '../interfaces/ILine';
import { ITransformation } from '../interfaces/ITransformation';
import { DrawLine } from '../models/draw/DrawLine';
import { Point } from '../models/Point';
import { Line } from '../models/Line';

// Due to the nature of fractals, there will be quite a bit of recursion.
// It doesn't make sense to construct a model and then dump out all of the lines.
// This class calculates the recursion and plots the lines when appropriate.

export class DrawDragonFractal implements IDrawElement {
    level: number;
    line: ILine;

    constructor(line: ILine, level: number)
    {
        this.level = level;
        this.line = line;
    }

    clone(): IDrawElement {
        return new DrawDragonFractal(this.line, this.level);
    }

    draw(context: CanvasRenderingContext2D): void {
        this.drawFrac(context, this.line, this.level);
    }

    transform(transformation: ITransformation): void {
        transformation.transform(this.line.start);
        transformation.transform(this.line.end);
    }

    private drawFrac(context: CanvasRenderingContext2D, line: ILine, level: number)
    {
        if (level == 0)
        {
            var drawLine = new DrawLine(line);

            drawLine.draw(context);
        }
        else
        {
            var point = new Point((line.start.x + line.end.x) / 2 + (line.end.y - line.start.y) / 2
                                , (line.start.y + line.end.y) / 2 - (line.end.x - line.start.x) / 2);

            this.drawFrac(context, new Line(line.start, point), level - 1);
            this.drawFrac(context, new Line(line.end, point), level - 1);
        }
    }
}