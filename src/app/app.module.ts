import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingComponent } from './components/drawing/drawing.component';
import { DragonFractalComponent } from './components/fractals/dragon.component';
import { FishBowlComponent } from './components/drawing/fishbowl.component';
import { FractalControlsComponent } from './components/fractals/fractalControls.component';
import { KochFractalComponent } from './components/fractals/koch.component';
import { TreeFractalComponent } from './components/fractals/tree.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawingComponent,
    DragonFractalComponent,
    FishBowlComponent,
    FractalControlsComponent,
    KochFractalComponent,
    TreeFractalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatTabsModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
