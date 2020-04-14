import { IPoint } from 'src/app/models/interfaces/IPoint';
import { IDrawElement } from '../../draw/interfaces/IDrawElement';
import { ITransformation } from '../interfaces/ITransformation';

type CustomFunction = (element: IDrawElement) => void;

export class CustomTransformation implements ITransformation {

    private customFunction: CustomFunction;
    private drawElement: IDrawElement;
    private executeEvery: number;
    private iteration: number = 0;              // The current execution (based on the number of points in the element)

    constructor(element: IDrawElement, executeEvery: number, translation: CustomFunction)
    {
        this.customFunction = translation;
        this.drawElement = element;
        this.executeEvery = executeEvery;
    }

    clone(): ITransformation {
        return new CustomTransformation(this.drawElement, this.executeEvery, this.customFunction);
    }

    transform(point: IPoint): void {
        // This really feels like a hack, but I think it's better than adding the element to the transform() interface.

        if (this.iteration == 0) {
            this.customFunction(this.drawElement);
        }

        this.iteration = (this.iteration + 1) % this.executeEvery;
    }
}