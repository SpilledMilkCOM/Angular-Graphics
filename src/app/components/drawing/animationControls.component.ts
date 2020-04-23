import { Component, EventEmitter, Input, Output } from "@angular/core";

// Just a collection of common controls...

@Component({
    selector: 'gr-animation-controls'
    , styleUrls: ['./animationControls.component.css']
    , templateUrl: './animationControls.component.html'
})
export class AnimationControlsComponent {

    // Display (input) only (so the parent can inject values into this control)
    @Input() collisions: boolean = false;
    @Input() elapsedMilliseconds: number = 0;
    @Input() elements: number = 0;
    @Input() height: number = 0;
    @Input() frameCounter: number = 0;
    @Input() frameRate: number = 24;                 // Frames per second.
    @Input() width: number = 0;

    // Events that the parent is listening to.
    @Output() clear = new EventEmitter();
    @Output() collisionsChanged = new EventEmitter<boolean>();
    @Output() frame = new EventEmitter();
    @Output() frameRateChanged = new EventEmitter<string>();
    @Output() start = new EventEmitter<boolean>();

    buttonText: string = "Start";

    public clickClear() {
        this.clear.emit();
    }

    public clickCollisions() {
        this.collisionsChanged.emit(this.collisions);
    }

    public clickFrame() {
        this.frame.emit();
    }

    public clickStart() {

        var started = false;

        if (this.buttonText == "Start") {
            this.buttonText = "Stop";
            started = true;
        }
        else {
            this.buttonText = "Start";
        }

        this.start.emit(started);
    }
  
    public onEnter(value: string) {
        this.frameRateChanged.emit(value);
    }
}