import { IPoint } from '../interfaces/IPoint';
import { IRectangle } from '../interfaces/IRectangle';
import { ISize } from '../interfaces/ISize';

export class Rectangle implements IRectangle {
    center: IPoint;
    size: ISize;

    constructor(center: IPoint, size: ISize)
    {
        this.center = center;
        this.size = size;
    }

    clone(): IRectangle
    {
        return new Rectangle(this.center.clone(), this.size.clone());
    }
}