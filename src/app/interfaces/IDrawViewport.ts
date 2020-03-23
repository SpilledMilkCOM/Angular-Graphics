import { IPoint } from './IPoint';
import { ISize } from './ISize';
import { ITransformation } from './ITransformation';

export interface IDrawViewport {
    origin: IPoint;
    size: ISize;
    transformation: ITransformation;
}