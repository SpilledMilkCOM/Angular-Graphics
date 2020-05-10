import { Component, ViewChild } from '@angular/core';

import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Angular & <canvas/>';
  public mainMenu = [["home", "Home"], ["art", "Art"], ["fractals", "Fractals"], ["test", "Test"],];

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
}