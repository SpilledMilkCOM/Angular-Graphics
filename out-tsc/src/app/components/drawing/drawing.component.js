import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { Lines } from 'src/app/models/Lines';
import { Point } from 'src/app/models/Point';
var DrawingComponent = /** @class */ (function () {
    function DrawingComponent() {
    }
    DrawingComponent.prototype.ngOnInit = function () {
        // https://www.w3schools.com/TAgs/ref_canvas.asp
        this.context = this.canvas.nativeElement.getContext("2d");
        var lines = new Lines();
        lines.addPoint(new Point(0, 0));
        lines.addPoint(new Point(100, 50));
        lines.addPoint(new Point(50, 100));
        lines.addPoint(new Point(200, 200));
        lines.draw(this.context);
        // this.context.beginPath();
        // this.context.moveTo(0, 0);
        // this.context.lineTo(this.context.canvas.width, this.context.canvas.height);
        // this.context.stroke();
    };
    tslib_1.__decorate([
        ViewChild('canvasId'),
        tslib_1.__metadata("design:type", ElementRef)
    ], DrawingComponent.prototype, "canvas", void 0);
    DrawingComponent = tslib_1.__decorate([
        Component({
            selector: 'gr-drawing',
            template: '<canvas #canvasId width="600" height="600">Canvas not supported.</canvas>'
        })
    ], DrawingComponent);
    return DrawingComponent;
}());
export { DrawingComponent };
//# sourceMappingURL=drawing.component.js.map