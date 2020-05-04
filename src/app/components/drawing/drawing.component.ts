import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { IDrawElement } from 'src/app/draw/interfaces/IDrawElement';

import { DrawCircle } from 'src/app/draw/primitives/DrawCircle';
import { DrawLine } from '../../draw/primitives/DrawLine';
import { DrawLines } from '../../draw/primitives/DrawLines';
import { DrawPoint } from '../../draw/primitives/DrawPoint';
import { DrawRectangle } from '../../draw/primitives/DrawRectangle';
import { DrawViewport } from '../../draw/DrawViewport';
import { DrawWorld } from '../../draw/DrawWorld';

import { Circle } from 'src/app/models/Circle';
import { Line } from '../../models/Line';
import { Lines } from '../../models/Lines';
import { Point } from '../../models/Point';
import { Rectangle } from '../../models/Rectangle';
import { RightTriangle } from '../../models/RightTriangle';
import { Size } from '../../models/Size';
import { Translation } from 'src/app/models/transform/Translation';
import { Rotation } from 'src/app/models/transform/Rotation';
import { RegularPolygon } from 'src/app/primitives/RegularPolygon';
import { Transformations } from 'src/app/models/transform/Transformations';
import { Vector } from 'src/app/models/Vector';

@Component({
    selector: 'gr-drawing'
    , styleUrls: ['./drawing.component.css']
    , templateUrl: './drawing.component.html'
})
export class DrawingComponent implements AfterViewInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;

    canvasHeight: number = 600;
    canvasWidth: number = 600;

    buttonText: string = "Start";
    collisions: boolean;
    elapsedMilliseconds: number = 0;
    elements: number = 0;
    frameCounter: number = 0;
    frameRate: number = 24;                 // Frames per second.
    timer: any;
    drawWorld: DrawWorld;

    public animateSingleFrame(): void {
        this.animateFrame(this);
    }

    public clearCanvas() {
        var start = Date.now();

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.elapsedMilliseconds = Date.now() - start;
    }

    public frameRateChanged(event: string) {
        this.frameRate = parseInt(event);
    }

    ngAfterViewInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

        var start = Date.now();

        var closedLoop = true;

        this.canvasWidth = window.innerWidth - 35;
        this.canvasHeight = window.innerHeight - 305;

        this.context = this.canvas.nativeElement.getContext("2d");

        var drawViewport = new DrawViewport(this.context);
        var drawWorld = new DrawWorld(null, drawViewport);

        // Test many lines (spaceship)

        // var lines = new Lines();

        // lines.addPoint(new Point(250, 225));
        // lines.addPoint(new Point(200, 200));
        // lines.addPoint(new Point(250, 300));
        // lines.addPoint(new Point(300, 200));

        // var drawLines = new DrawLines(lines, closedLoop);

        // drawWorld.addElement(drawLines, "spaceship");

        // var transformations = new Transformations();

        // transformations.addTransformation(new Translation(new Point(1, -4)));
        // // Sending in a reference to the 1st point (as long as the reference is the first point then that will be translated first as a reference to the others)
        // transformations.addTransformation(new Rotation(Math.PI / 90, drawLines.lines.points[0]));

        // drawWorld.addTransformation("spaceship", transformations);

        // The transformation above is still kind of a hack

        // drawWorld.addTransformation("spaceship"
        //     , new CustomTransformation(spaceship, lines.points.length, (element: IDrawElement) => {

        //         if (element != null) {
        //             // Since the draw element is a bunch of lines, then I only want to do this ONCE per batch.

        //             element.transform(new Translation(new Point(1, -4)));

        //             var spaceshipLines = <DrawLines>element;       // NOTE: cast operator, casting

        //             element.transform(new Rotation(Math.PI / 90, spaceshipLines.lines.points[3]));
        //         }
        //     }));

        // Test points

        // drawWorld.addElement(new DrawPoint(new Point(300, 300)));
        // drawWorld.addElement(new DrawPoint(new Point(300, 310)));
        // drawWorld.addElement(new DrawPoint(new Point(310, 300)));
        // drawWorld.addElement(new DrawPoint(new Point(310, 310)));

        // Test rectangle

        //drawWorld.addElement(new DrawRectangle(new Rectangle(new Point(500, 300), new Size(100, 10))));
        drawWorld.addElement(new DrawRectangle(new Rectangle(new Point(75, 75), new Size(100, 100))));
        drawWorld.addElement(new DrawRectangle(new Rectangle(
            new Point(drawViewport.size.width / 2, drawViewport.size.height / 2)
            , new Size(drawViewport.size.width, drawViewport.size.height))), "viewRect");

        // Test right triangle

        //drawWorld.addElement(new DrawLines(new RightTriangle(new Point(200, 400), new Size(30, 30)).segments, closedLoop));

        // Test circle

        // var circle1 = new DrawCircle(new Circle(new Point(400, 400), 20));
        // var circle2 = new DrawCircle(new Circle(new Point(450, 420), 20));

        // drawWorld.addElement(circle1, "circle1");
        // drawWorld.addElement(circle2, "circle2");

        // // Connect the centers (the centers are viewport relative)

        // var centerLine = new DrawLine(new Line(circle1.circle.center, circle2.circle.center));

        // drawWorld.addElement(centerLine, null, null, true);

        // var vector1 = new Vector(centerLine.line.start);
        // var vector2 = new Vector(centerLine.line.end);

        // // A perpendicular vector to the center line.

        // var vectorPerp = vector1.add(vector2.multiplyByConstant(-1)).perpendicular();        // Substract the centers to get a vector from 1 to 2

        // var perpLine = new DrawLine(new Line(new Point(0, 0), new Point(vectorPerp.point.x, vectorPerp.point.y)));

        // perpLine.transform(new Translation(vector1.point));

        // drawWorld.addElement(perpLine, null, null, true);

        // Test regular polygon

        // drawWorld.addElement(new DrawLines(new RegularPolygon(new Point(400, 100), 30, 3).segments, closedLoop), "triangle"
        //     , new Rotation(Math.PI / 2 / this.frameRate, drawWorld.toViewport(new Point(400, 100))));

        // drawWorld.addElement(new DrawLines(new RegularPolygon(new Point(450, 100), 30, 5).segments, closedLoop), "pentagon"
        //     , new Rotation(Math.PI / 3 / this.frameRate, drawWorld.toViewport(new Point(400, 100))));

        // drawWorld.addElement(new DrawLines(new RegularPolygon(new Point(500, 100), 30, 8).segments, closedLoop), "octagon"
        //     , new Rotation(Math.PI / 4 / this.frameRate, drawWorld.toViewport(new Point(500, 100))));     // 45 degrees per second.

        drawWorld.draw(this.context);

        this.drawWorld = drawWorld;
        this.elapsedMilliseconds = Date.now() - start;
        this.elements = drawWorld.elements.length;          // Number of elements

        // Adjust the viewport size based on the actual size of the window.

        this.onResize(null);
    }

    public onResize(event) {
        this.canvasWidth = window.innerWidth - 35;
        this.canvasHeight = window.innerHeight - 305;

        // The properties above are bound to the canvas, BUT are not immediate changes with respect to the context.
        // By setting these properties you destroy the canas' context so you will need to get a reference to a NEW context.

        // Fire a redraw after a bit.

        setTimeout(this.redrawCanvas, 100, this);
    }

    public toggleAnimation(started: boolean): void {

        if (started) {
            this.timer = setInterval(this.animateFrame, 1000 / this.frameRate, this);
        }
        else {
            clearInterval(this.timer);
        }
    }

    //----==== PRIVATE ====------------------------------------------------------------------------

    private animateFrame(drawing: DrawingComponent): void {
        // !!! DO NOT USE 'this' IN THIS METHOD !!!!

        drawing.frameCounter++;

        // So far, this is fast enough to clear and redraw the entire frame. (even on my crappy i5, I need to test on a phone too)

        drawing.drawWorld.animateFrame();
        drawing.clearCanvas();
        drawing.drawWorld.draw(drawing.context);
        drawing.elements = drawing.drawWorld.elements.length;          // Number of elements
    }

    private redrawCanvas(drawing: DrawingComponent): void {
        // !!! DO NOT USE 'this' IN THIS METHOD !!!!

        // The canvas is based on the width and height

        drawing.context = drawing.canvas.nativeElement.getContext("2d");
        drawing.drawWorld.setViewport(new DrawViewport(drawing.context));
        drawing.clearCanvas();
        
        var viewRect = drawing.drawWorld.findDrawElement("viewRect") as DrawRectangle;

        if (viewRect != null) {
            viewRect.size = new Size(drawing.canvasWidth, drawing.canvasHeight);
        }

        drawing.drawWorld.draw(drawing.context);
    }
}