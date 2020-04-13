import { IPoint } from 'src/app/interfaces/IPoint';
import { ITransformation } from '../../interfaces/ITransformation';

// Translation is a movement along each axis.

export class Transformations implements ITransformation {
    transformations: ITransformation[];

    constructor(transformations: ITransformation[] = null)
    {
        this.transformations = transformations != null ? transformations : new Array<ITransformation>();
    }

    addTransformation(transformation: ITransformation)
    {
        this.transformations.push(transformation);
    }

    clone(): ITransformation {
        var transformations = new Array<ITransformation>();

        this.transformations.forEach(item => transformations.push(item.clone()));

        return new Transformations(transformations);
    }

    transform(point: IPoint): void {
        this.transformations.forEach(item => item.transform(point));
    }
}