import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { AnimationControlsComponent } from './components/drawing/animationControls.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingComponent } from './components/drawing/drawing.component';
import { DragonFractalComponent } from './components/fractals/dragon.component';
import { FishBowlComponent } from './components/drawing/fishbowl.component';
import { FractalControlsComponent } from './components/fractals/fractalControls.component';
import { KochFractalComponent } from './components/fractals/koch.component';
import { OrbitsComponent } from './components/art/orbits.component';
import { SpokesComponent } from './components/art/spokes.component';
import { TreeFractalComponent } from './components/fractals/tree.component';

import { ArtComponent } from './views/art/art.component';
import { HomeComponent } from './views/home/home.component';
import { FractalsComponent } from './views/fractals/fractals.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationControlsComponent,
    ArtComponent,
    HomeComponent,
    DrawingComponent,
    DragonFractalComponent,
    FishBowlComponent,
    FractalControlsComponent,
    FractalsComponent,
    KochFractalComponent,
    OrbitsComponent,
    SpokesComponent,
    TreeFractalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,

    // If there were many modules that define routing then the ORDER WOULD MATTER!
    // Since this is an array the imports processing is done in order and you'd want the
    // Root routes to be defined last so they would overwrite anything defined before.

    RouterModule.forRoot([    // Order matters in this array, routing will pick the first match!
      { path: 'art', component: ArtComponent },
      { path: 'fractals', component: FractalsComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
