import { IPoint } from '../interfaces/IPoint';
import { IRect } from '../interfaces/IRect';
import { IRectangle } from '../interfaces/IRectangle';

import { Rectangle } from './Rectangle';
import { Point } from './Point';
import { Size } from './Size';

/**
 * Mostly used for boundaries
 */
export class Rect implements IRect {
    max: IPoint;
    min: IPoint;

    constructor(min: IPoint, max: IPoint)
    {
        this.max = max;
        this.min = min;
    }

    clone(): IRect
    {
        return new Rect(this.min.clone(), this.max.clone());
    }

    cloneRectangle(): IRectangle {
        return new Rectangle(new Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2)
                            , new Size(this.max.x - this.min.x, this.max.y - this.min.y));
    }
}