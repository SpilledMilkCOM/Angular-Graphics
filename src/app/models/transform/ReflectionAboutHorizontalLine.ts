import { IPoint } from '../interfaces/IPoint';
import { ITransformation } from '../interfaces/ITransformation';

export class ReflectionAboutHorizontalLine implements ITransformation {

    private y: number;

    constructor(y: number) {
        this.y = y;
    }

    clone(): ITransformation {
        return new ReflectionAboutHorizontalLine(this.y);
    }

    transform(point: IPoint): void {
        // If the transformation is about a horizontal line, then the X component does NOT change.

        point.y = 2 * this.y - point.y;
    }
}