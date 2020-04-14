import { IDrawElement } from '../interfaces/IDrawElement';
import { ILine } from '../../models/interfaces/ILine';
import { IRect } from '../../models/interfaces/IRect';
import { ITransformation } from '../../models/interfaces/ITransformation';

import { DrawLine } from '../primitives/DrawLine';
import { Line } from '../../models/Line';
import { Point } from '../../models/Point';

// Due to the nature of fractals, there will be quite a bit of recursion.
// It doesn't make sense to construct a model and then dump out all of the lines.
// This class calculates the recursion and plots the lines when appropriate.

export class DrawTreeFractal implements IDrawElement {
    level: number;
    trunk: ILine;

    private segmentCount: number;

    constructor(trunk: ILine, level: number) {
        this.level = level;
        this.trunk = trunk;
        this.segmentCount = 0;
    }

    /**
     * Only the bounds of the seed triangle
     */

    bounds(): IRect {
        return new DrawLine(this.trunk).bounds();
    }

    clone(): IDrawElement {
        return new DrawTreeFractal(this.trunk.clone(), this.level);
    }

    draw(context: CanvasRenderingContext2D): void {

        this.segmentCount = 0;
        this.drawFrac(context, this.trunk, this.level);
    }

    segments(): number {
        // The base is the number of segments per level.
        return this.segmentCount;
    }

    transform(transformation: ITransformation): void {
        transformation.transform(this.trunk.start);
        transformation.transform(this.trunk.end);
    }

    private drawFrac(context: CanvasRenderingContext2D, line: ILine, level: number) {
        if (level == 0) {
            new DrawLine(line).draw(context);
            this.segmentCount++;
        }
        else {
            // The new points are taken from (line/vector) _AB_
            //
            //      C     D
            //       \   /
            //         B
            //         |
            //         A

            // each operation compilation is used 3 times

            new DrawLine(line).draw(context);
            this.segmentCount++;

            var xLength = (line.end.y - line.start.y) / 3;
            var yLength = (line.end.y - line.start.y) / 2;

            this.drawFrac(context, new Line(line.end, new Point(line.end.x - xLength , line.end.y + yLength)), level - 1);
            this.drawFrac(context, new Line(line.end, new Point(line.end.x + xLength , line.end.y + yLength)), level - 1);
        }
    }
}