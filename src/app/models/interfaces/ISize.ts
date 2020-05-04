export interface ISize {
    height: number;
    width: number;

    clone(): ISize;
    equals(size: ISize): boolean;
}