import { IDrawElement } from '../../interfaces/IDrawElement';
import { ILine } from '../../interfaces/ILine';
import { IPoint } from '../../interfaces/IPoint';
import { ITransformation } from '../../interfaces/ITransformation';

export class DrawLine implements IDrawElement {

    line: ILine;

    constructor(line: ILine)
    {
        this.line = line;
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