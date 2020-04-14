import { IPoint } from '../interfaces/IPoint';
import { ITransformation } from '../interfaces/ITransformation';

export class Movement implements ITransformation {
    reference: IPoint;
    rotation: ITransformation;
    translation: ITransformation;

    constructor(reference: IPoint, translation: ITransformation, rotation: ITransformation)
    {
        this.reference = reference;
        this.rotation = rotation;
        this.translation = translation;
    }

    clone(): ITransformation {
        return new Movement(this.reference, this.translation, this.rotation);
    }

    transform(point: IPoint): void {
    }
}