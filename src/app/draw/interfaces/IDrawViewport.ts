import { IPoint } from '../../models/interfaces/IPoint';
import { ISize } from '../../models/interfaces/ISize';
import { ITransformation } from '../../models/interfaces/ITransformation';
import { IDrawElement } from './IDrawElement';

export interface IDrawViewport {
    origin: IPoint;
    size: ISize;
    transformation: ITransformation;

    adjustTransformation(transformation: ITransformation): void;
    equals(viewport: IDrawViewport): boolean;
    toWorldTransformation(): ITransformation;
    transform(element: IDrawElement): void;
}