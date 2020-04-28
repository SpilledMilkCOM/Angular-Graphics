/**
 * The objective of collision is to try to make this easy.
 * For now, just treat everything as a circle and if their
 * centers are closer than their radii then they have collided.
 */
export interface ICollision {
    clone(): ICollision;
    collidedWith(collision: ICollision): boolean;
}