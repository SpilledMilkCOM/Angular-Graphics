import { IDrawElement } from './interfaces/IDrawElement';
import { IDrawViewport } from 'src/app/draw/interfaces/IDrawViewport';
import { IPoint } from 'src/app/models/interfaces/IPoint';
import { ISize } from 'src/app/models/interfaces/ISize';
import { ITransformation } from 'src/app/models/interfaces/ITransformation';

import { Point } from '../models/Point';
import { ReflectionAboutHorizontalLine } from '../models/transform/ReflectionAboutHorizontalLine';
import { Size } from '../models/Size';
import { Translation } from '../models/transform/Translation';
import { Transformations } from '../models/transform/Transformations';

/**
 * The viewport represents the canvas with the origin at the bottom left and increases in Y go UP!
 */
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

    /**
     * Adjust the transformation based on the viewport's transformation(s)
     */
    adjustTransformation(transformation: ITransformation): void {

    }

    /**
     * Transform the element so its coordinates are viewport relative.
     * 
     * @param element The element to be transformed to the viewport.
     */
    transform(element: IDrawElement): void {
        element.transform(this.transformation);
    }
}