import { ISize } from './interfaces/ISize';

export class Size implements ISize {
    height: number;
    width: number;

    constructor(width: number, height: number)
    {
        this.height = height;
        this.width = width;
    }

    public clone(): ISize {
        return new Size(this.width, this.height);
    }

    public equals(size: ISize): boolean {
        return this.height == size.height && this.width == size.width;
    }
}