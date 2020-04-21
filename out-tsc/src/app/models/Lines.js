var Lines = /** @class */ (function () {
    function Lines() {
        this.points = new Array();
    }
    Lines.prototype.addPoint = function (point) {
        this.points.concat(point);
    };
    Lines.prototype.draw = function (context) {
        // Has at least 2 points to make a line.
        if (this.points.length > 1) {
            context.beginPath();
            context.moveTo(this.points[0].x, this.points[0].y);
            var skipCount = 1;
            this.points.forEach(function (element) {
                if (skipCount == 0) {
                    context.lineTo(element.x, element.y);
                }
                else {
                    skipCount--;
                }
            });
            context.stroke();
        }
    };
    return Lines;
}());
export { Lines };
//# sourceMappingURL=Lines.js.map