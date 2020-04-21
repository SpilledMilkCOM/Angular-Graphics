var Line = /** @class */ (function () {
    function Line(start, end) {
        this.start = start;
        this.end = end;
    }
    Line.prototype.draw = function (context) {
        context.beginPath();
        context.moveTo(this.start.x, this.start.y);
        context.lineTo(this.end.x, this.end.x);
        context.stroke();
    };
    return Line;
}());
export { Line };
//# sourceMappingURL=Line.js.map