import { IPoint } from '../../interfaces/IPoint';
import { ITransformation } from '../../interfaces/ITransformation';
import { ILine } from 'src/app/interfaces/ILine';

/**
 * Reflected about a line Ax + By + C = 0.
 * 
 * @url: http://sdmath.com/math/geometry/reflection_across_line.html
 */
export class ReflectionAboutLine implements ITransformation {

    private line: ILine;

    constructor(line: ILine)
    {
        this.line = line;
    }

    clone(): ITransformation {
        return new ReflectionAboutLine(this.line.clone());
    }

    transform(point: IPoint): void {
    }
}