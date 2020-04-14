import { IPoint } from 'src/app/models/interfaces/IPoint';
import { ITransformation } from '../interfaces/ITransformation';

// TODO: Might want to change the perspective and adjust the context (possibly) instead of adjusting all of the points.

export class Scale implements ITransformation {
    scale: IPoint;

    constructor(scale: IPoint)
    {
        this.scale = scale;
    }

    clone(): ITransformation {
        return new Scale(this.scale.clone());
    }

    transform(point: IPoint): void {
        point.x *= this.scale.x;
        point.y *= this.scale.y;
    }
}