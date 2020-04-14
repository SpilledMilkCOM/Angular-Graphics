// Points are "dumb", they are not as smart as vectors.
// (They don't carry the methods around that vectors do.)

export interface IPoint {
    x: number;
    y: number;

    clone(): IPoint;
}