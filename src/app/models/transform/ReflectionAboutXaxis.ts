import { IPoint } from '../../interfaces/IPoint';
import { ITransformation } from '../../interfaces/ITransformation';

export class ReflectionAboutXaxis implements ITransformation {

    clone(): ITransformation {
        return new ReflectionAboutXaxis();
    }

    transform(point: IPoint): void {
        point.y *= -1;
    }
}