import { IPoint } from 'src/app/models/interfaces/IPoint';
import { ITransformation } from '../interfaces/ITransformation';

// Rotation is about a point (not necesarily about the origin)

// TODO: Might want to change the perspective and adjust the context (possibly) instead of adjusting all of the points.

export class Rotation implements ITransformation {
    about: IPoint;
    angle: number;

    constructor(angleInRadians: number, rotationAbout: IPoint)
    {
        this.about = rotationAbout;
        this.angle = angleInRadians;
    }

    clone(): ITransformation {
        return new Rotation(this.angle, this.about.clone());
    }

    transform(point: IPoint): void {
        var cosA = Math.cos(this.angle);
        var sinA = Math.sin(this.angle);

        var x = (point.x - this.about.x) * cosA - (point.y - this.about.y) * sinA + this.about.x;
        var y = (point.x - this.about.x) * sinA + (point.y - this.about.y) * cosA + this.about.y;

        point.x = x;
        point.y = y;
    }
}