import { Component, Input } from '@angular/core';

@Component({
    selector: 'gr-home-field'
    , styleUrls: ['./gr-home-field.component.css']
    , templateUrl: './gr-home-field.component.html'
})
export class grHomeFieldComponent {
    @Input() label: string = "gr-home-field";
    @Input() readOnly: boolean = true;
    @Input() value: string = "hello";
}