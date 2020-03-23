import { IPoint } from 'src/app/interfaces/IPoint';
import { ITransformation } from '../../interfaces/ITransformation';

// Translation is a movement along each axis.

export class Translation implements ITransformation {
    translation: IPoint;

    constructor(translation: IPoint)
    {
        this.translation = translation;
    }

    clone(): ITransformation {
        return new Translation(this.translation.clone());
    }

    transform(point: IPoint): void {
        point.x += this.translation.x;
        point.y += this.translation.y;
    }
}