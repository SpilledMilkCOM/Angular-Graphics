import { IPoint } from './interfaces/IPoint';
import { IRect } from './interfaces/IRect';
import { IRectangle } from './interfaces/IRectangle';
import { ISize } from './interfaces/ISize';

import { Rect } from './Rect';
import { Point } from './Point';

/**
 * Matches the other "primitives" plotted using the center.
 */
export class Rectangle implements IRectangle {
    center: IPoint;
    size: ISize;

    constructor(center: IPoint, size: ISize) {
        this.center = center;
        this.size = size;
    }

    clone(): IRectangle {
        return new Rectangle(this.center.clone(), this.size.clone());
    }

    cloneRect(): IRect {
        var halfHeight = this.size.height / 2;
        var halfWidth = this.size.width / 2;

        return new Rect(new Point(this.center.x - halfWidth, this.center.y - halfHeight )
                        , new Point(this.center.x + halfWidth, this.center.y + halfHeight));
    }
}