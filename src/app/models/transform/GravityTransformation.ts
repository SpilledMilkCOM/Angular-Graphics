import { IPoint } from 'src/app/models/interfaces/IPoint';
import { IDrawElement } from '../../draw/interfaces/IDrawElement';
import { ITransformation } from '../interfaces/ITransformation';
import { Translation } from './Translation';
import { IContainment } from 'src/app/services/IContainment';

export class GravityTransformation implements ITransformation {

    private acceleration: number;
    private containment: IContainment;
    private element: IDrawElement;
    private friction: number;
    private translation: Translation;

    constructor(element: IDrawElement, translation: Translation, acceleration: number, friction: number, containment: IContainment) {
        this.acceleration = acceleration;
        this.containment = containment;
        this.element = element;
        this.friction = friction;
        this.translation = translation;
    }

    clone(): ITransformation {
        return new GravityTransformation(this.element, this.translation, this.acceleration, this.friction, this.containment);
    }

    transform(point: IPoint): void {
        this.element.transform(this.translation);

        this.translation.translation.y += this.acceleration;

        var contained = this.containment.contain(this.element, this.translation);

        if (contained.y > 0) {
            // Apply friction on the bounce.

            this.translation.translation.y *= this.friction;
        }
    }
}