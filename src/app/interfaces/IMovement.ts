import { ITransformation } from './ITransformation';

export interface IMovement {
    transformationPerSecond: ITransformation;

    clone(): IMovement;
}