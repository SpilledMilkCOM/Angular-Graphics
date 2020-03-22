import { IPoint } from '../interfaces/IPoint';

export class Point implements IPoint {
    x: number;
    y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    draw(context: CanvasRenderingContext2D): void
    {
        
    }
}