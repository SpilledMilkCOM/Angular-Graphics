import { IPoint } from 'src/app/interfaces/IPoint';
import { IDrawElement } from '../../interfaces/IDrawElement';
import { ITransformation } from '../../interfaces/ITransformation';

type CustomFunction = (element: IDrawElement) => void;

export class CustomTransformation implements ITransformation {

    private customFunction: CustomFunction;

    constructor(translation: CustomFunction)
    {
        this.customFunction = translation;
    }

    clone(): ITransformation {
        return new CustomTransformation(this.customFunction);
    }

    transform(point: IPoint): void {
    }
}