import { IMomentum } from './interfaces/IMomentum';
import { IVector } from './interfaces/IVector';

export class Momentum implements IMomentum {
    mass: number;
    velocity: IVector;

    constructor(mass: number, velocity: IVector) {
        this.mass = mass;
        this.velocity = velocity;
    }

    clone(): IMomentum {
        return new Momentum(this.mass, this.velocity.clone());
    }

    reflectWith(momentum: IMomentum): void {
        // Conservation of momentum is => m1 * v1 + m2 * v2 = 0
        //      v1 = -(m2 * v2) / m1
        //      v1 = v2 * (-m2 / m1)
        //
        // Reflection is m1 * v1 - m1 * v1 = 0
        // The velocity is negative (in the other direction)
        //
        // Also the total momentum before and after the collision must equal.
        //      m1 * v1 + m2 * v2 = m1' * v1' + m2' + v2'

        var reflectedVelocity = momentum.velocity.multiplyByConstant(-momentum.mass / this.mass);

        momentum.velocity.set(this.velocity.multiplyByConstant(-this.mass / momentum.mass));

        this.velocity = reflectedVelocity;
    }
}