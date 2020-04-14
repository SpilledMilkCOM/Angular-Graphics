import { IDrawViewport } from 'src/app/interfaces/IDrawViewport';
import { IPoint } from 'src/app/interfaces/IPoint';
import { ISize } from 'src/app/interfaces/ISize';
import { ITransformation } from 'src/app/interfaces/ITransformation';

import { Point } from '../Point';
import { Size } from '../Size';
import { Translation } from '../transform/Translation';
import { Transformations } from '../transform/Transformations';
import { ReflectionAboutHorizontalLine } from '../transform/ReflectionAboutHorizontalLine';

export class DrawViewport implements IDrawViewport {

    origin: IPoint;
    size: ISize;
    transformation: ITransformation;      // TODO: Might be multiple transformations

    constructor(context: CanvasRenderingContext2D)
    {
        this.size = new Size(context.canvas.width, context.canvas.height);

        // By default, the origin is in the bottom left (versus the center)

        this.origin = new Point(0, this.size.height);

        var transformations = new Transformations(null);

        transformations.addTransformation(new ReflectionAboutHorizontalLine(0));    // X-axis
        transformations.addTransformation(new Translation(this.origin));

        this.transformation = transformations;
    }
}