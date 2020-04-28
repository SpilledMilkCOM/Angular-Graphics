import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { IDrawElement } from 'src/app/draw/interfaces/IDrawElement';

import { DrawCircle } from 'src/app/draw/primitives/DrawCircle';
import { DrawRectangle } from '../../draw/primitives/DrawRectangle';
import { DrawViewport } from '../../draw/DrawViewport';
import { DrawWorld } from '../../draw/DrawWorld';

import { Circle } from 'src/app/models/Circle';
import { ContainmentService } from 'src/app/services/containment.service';
import { Point } from '../../models/Point';
import { Rect } from 'src/app/models/Rect';
import { Rectangle } from '../../models/Rectangle';
import { Size } from '../../models/Size';
import { Translation } from 'src/app/models/transform/Translation';
import { CustomTransformation } from 'src/app/models/transform/CustomTransformation';
import { GravityTransformation } from 'src/app/models/transform/GravityTransformation';

@Component({
    selector: 'gr-gravity'
    , templateUrl: './gravity.component.html'
})
export class GravityComponent implements AfterViewInit {

    @ViewChild('canvasId')
    canvas: ElementRef<HTMLCanvasElement>;

    private context: CanvasRenderingContext2D;
    private drawWorld: DrawWorld;

    // Height and width of the canvas.
    canvasHeight: number = 600;
    canvasWidth: number = 600;

    collisions: boolean = false;
    elapsedMilliseconds: number = 0;
    elements: number = 0;
    frameCounter: number = 0;
    frameRate: number = 60;                 // Frames per second.
    timer: any;

    constructor(private containment: ContainmentService) {     // Injected service.
    }

    animateSingleFrame(): void {
        this.animateFrame(this);
    }

    public clearCanvas() {
        var start = Date.now();

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        this.elapsedMilliseconds = Date.now() - start;
    }

    public collisionsChanged(isChecked: boolean): void {
        this.collisions = isChecked;
    }

    public frameRateChanged(event: string) {
        this.frameRate = parseInt(event);

        // TODO: Adjust the Transformations based on the new frame rate.
    }

    ngAfterViewInit(): void {
        // https://www.w3schools.com/TAgs/ref_canvas.asp

        var start = Date.now();

        this.context = this.canvas.nativeElement.getContext("2d");

        var drawViewport = new DrawViewport(this.context);
        var drawWorld = new DrawWorld(null, drawViewport);

        drawWorld.addElement(new DrawRectangle(new Rectangle(new Point(drawViewport.size.width / 2, drawViewport.size.height / 2), new Size(drawViewport.size.width, drawViewport.size.height))));

        var index = 0;
        var marble = new DrawCircle(new Circle(new Point(275, 400), 10));
        var translation = new Translation(new Point(0, -5));
        var containment = this.containment;

        drawWorld.addElement(marble, "marble" + (index++).toString()
            , new CustomTransformation(marble, 1, (element: IDrawElement) => {

                if (element != null) {
                    element.transform(translation);

                    translation.translation.y += 0.2;       // Some acceleration.

                    var contained = containment.contain(element, translation);

                    if (contained.y > 0) {
                        // Apply friction on the bounce.

                        translation.translation.y *= 0.9;
                    }
                }
            }));

        marble = new DrawCircle(new Circle(new Point(300, 400), 10));
        var translation2 = new Translation(new Point(1, -5));

        drawWorld.addElement(marble, "marble" + (index++).toString()
            , new GravityTransformation(marble, translation2, 0.25, 0.9, this.containment));

        drawWorld.draw(this.context);

        this.drawWorld = drawWorld;
        this.elapsedMilliseconds = Date.now() - start;
        this.elements = drawWorld.elements.length;          // Number of elements

        this.containment.setBounds(new Rect(new Point(0, 0), new Point(this.context.canvas.width, this.context.canvas.height)));
    }

    onResize(event) {
        // The canvas is based on the width and height

        this.canvasWidth = event.target.innerWidth - 20;
        this.canvasHeight = event.target.innerHeight - 305;

        // TODO: Need to figure out why the context is invalid after a resize.

        //this.drawWorld.draw(this.context);

        this.ngAfterViewInit();

        // Fire a redraw after a bit.
        //setTimeout(this.drawWorld.draw, 100, this.context);
        //setTimeout(this.ngAfterViewInit, 250);
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

    private animateFrame(drawing: GravityComponent): void {

        // !!!!! DON'T REFERENCE 'this' IN THIS METHOD !!!!!
        // (THIS is effectively a STATIC method because there is NO 'this')
        // ('this' is being passed in as an argument (drawing))

        drawing.frameCounter++;

        // Contain all of the elements.

        drawing.drawWorld.elements.forEach(element => {
            drawing.containment.contain(element, <Translation>drawing.drawWorld.findDrawTransformation(element));
        });

        // So far, this is fast enough to clear and redraw the entire frame. (even on my crappy i5, I need to test on a phone too)

        drawing.drawWorld.animateFrame();
        drawing.clearCanvas();
        drawing.drawWorld.draw(drawing.context);
        drawing.elements = drawing.drawWorld.elements.length;          // Number of elements
    }
}