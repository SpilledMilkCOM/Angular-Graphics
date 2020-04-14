import { IDrawElement } from '../interfaces/IDrawElement';
import { ILine } from '../../models/interfaces/ILine';
import { IPoint } from '../../models/interfaces/IPoint';
import { IRect } from '../../models/interfaces/IRect';
import { IRegularPolygon } from '../../models/interfaces/IRegularPolygon';
import { ITransformation } from '../../models/interfaces/ITransformation';

import { DrawLine } from '../primitives/DrawLine';
import { DrawLines } from '../primitives/DrawLines';
import { Line } from '../../models/Line';
import { Lines } from '../../models/Lines';
import { Point } from '../../models/Point';
import { RegularPolygon } from '../../primitives/RegularPolygon';

// Due to the nature of fractals, there will be quite a bit of recursion.
// It doesn't make sense to construct a model and then dump out all of the lines.
// This class calculates the recursion and plots the lines when appropriate.

export class DrawKochFractal implements IDrawElement {
    level: number;
    triangle: IRegularPolygon;

    constructor(center: IPoint, radius: number, level: number) {
        this.level = level;
        this.triangle = new RegularPolygon(center, radius, 3);
    }

    /**
     * Only the bounds of the seed triangle
     */
    bounds(): IRect {
        var lines = new Lines();

        lines.addPoints(this.triangle.segments.points);

        return new DrawLines(lines).bounds();
    }

    clone(): IDrawElement {
        return new DrawKochFractal(this.triangle.center, this.triangle.radius, this.level);
    }

    draw(context: CanvasRenderingContext2D): void {

        this.drawFrac(context, new Line(this.triangle.segments.points[1], this.triangle.segments.points[0]), this.level);
        this.drawFrac(context, new Line(this.triangle.segments.points[2], this.triangle.segments.points[1]), this.level);
        this.drawFrac(context, new Line(this.triangle.segments.points[0], this.triangle.segments.points[2]), this.level);
    }

    segments(): number {
        // The base is the number of segments per level.
        return Math.pow(4, this.level) * this.triangle.sides;
    }

    transform(transformation: ITransformation): void {
        this.triangle.segments.points.forEach(point => {
            transformation.transform(point);
        });
    }

    private drawFrac(context: CanvasRenderingContext2D, line: ILine, level: number) {
        if (level == 0) {
            var drawLine = new DrawLine(line);

            drawLine.draw(context);
        }
        else {
            // The new points are taken from (line/vector) _AB_
            //        C
            //       / \
            //    A_D___E_B

            // each operation compilation is used 3 times
            var diffX = (line.end.x - line.start.x) / 6;
            var diffY = (line.end.y - line.start.y) / 6;
            var avgX = (line.start.x + line.end.x) / 2;
            var avgY = (line.start.y + line.end.y) / 2;

            var pointC = new Point(avgX + diffY * 2, avgY - diffX * 2);
            var pointD = new Point(avgX - diffX, avgY - diffY);
            var pointE = new Point(avgX + diffX, avgY + diffY);

            this.drawFrac(context, new Line(line.start, pointD), level - 1);
            this.drawFrac(context, new Line(pointD, pointC), level - 1);
            this.drawFrac(context, new Line(pointC, pointE), level - 1);
            this.drawFrac(context, new Line(pointE, line.end), level - 1);
        }
    }
}