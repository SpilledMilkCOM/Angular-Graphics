import { IPoint } from '../interfaces/IPoint';
import { ITransformation } from '../interfaces/ITransformation';

/**
 */
export class ReflectionAboutVerticalLine implements ITransformation {

    private x: number;

    constructor(x: number)
    {
        this.x = x;
    }

    clone(): ITransformation {
        return new ReflectionAboutVerticalLine(this.x);
    }

    transform(point: IPoint): void {
        // If the transformation is about a vertical line, then the Y component does NOT change.

        point.x = 2 * this.x - point.x;
    }
}