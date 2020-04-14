import { Component, EventEmitter, Input, Output } from "@angular/core";

// Just a collection of common controls...

@Component({
    selector: 'gr-fractal-controls'
    , templateUrl: './fractalControls.component.html'
})
export class FractalControlsComponent {

    // Display (input) only (so the parent can inject values into this control)
    @Input() elapsedMilliseconds: number = 0;
    @Input() level: number = 0;
    @Input() segments: number = 0;

    // Events that the parent is listening to.
    @Output() clear = new EventEmitter();
    @Output() levelChanged = new EventEmitter<string>();

    public clickClear() {
        this.clear.emit();
    }
    
    public onEnter(value: string) {
        this.levelChanged.emit(value);
    }
}