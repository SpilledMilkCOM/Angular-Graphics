import { IVector } from './IVector';

export interface IMomentum {
    mass: number;
    velocity: IVector;

    clone(): IMomentum;
    reflectWith(momentum: IMomentum): void;
}