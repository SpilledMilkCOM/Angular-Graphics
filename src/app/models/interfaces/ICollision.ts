import { IPoint } from './IPoint';

export interface ICollision {
    center: IPoint;
    radius: number;
    
    collision(collision: ICollision): boolean;
}