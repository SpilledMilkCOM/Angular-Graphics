import { Injectable } from '@angular/core';

import { IContainment } from './IContainment';
import { IRect } from '../models/interfaces/IRect';

import { Translation } from '../models/transform/Translation';
import { IDrawElement } from '../draw/interfaces/IDrawElement';
import { ReflectionAboutVerticalLine } from '../models/transform/ReflectionAboutVerticalLine';
import { ReflectionAboutHorizontalLine } from '../models/transform/ReflectionAboutHorizontalLine';
import { ITransformation } from '../models/interfaces/ITransformation';
import { Point } from '../models/Point';
import { IPoint } from '../models/interfaces/IPoint';

@Injectable({
    providedIn: 'root'
})
export class ContainmentService implements IContainment {

    private bounds: IRect;

    // TODO: Since this in injectable, the bounds has not been defined to inject in THIS class.
    // public constructor(private bounds: IRect) {
    // }

    public clone(): IContainment {
        var clone = new ContainmentService();

        clone.bounds = this.bounds.clone();

        return clone;
    }

    public contain(element: IDrawElement, transformation: ITransformation): IPoint {
        var translation = <Translation>transformation;
        var result = new Point(0, 0);

        if (element != null && translation !== undefined && translation.translation !== undefined) {
            var bounds = element.bounds();

            if (bounds.max.x > this.bounds.max.x || bounds.min.x < this.bounds.min.x) {

                translation.translation.x *= -1;     // Adjust the reference.

                element.transform(new ReflectionAboutVerticalLine(element.bounds().cloneRectangle().center.x));

                result.x = 1;
            }

            if (bounds.max.y > this.bounds.max.y || bounds.min.y < this.bounds.min.y) {

                translation.translation.y *= -1;     // Adjust the reference.

                element.transform(new ReflectionAboutHorizontalLine(element.bounds().cloneRectangle().center.y));

                result.y = 1;
            }
        }

        return result;
    }

    public setBounds(bounds: IRect): void {
        this.bounds = bounds;
    }
}