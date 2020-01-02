import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { RobotElementComponent } from './components/robot-element/robot-element.component';
import { RobotPageComponent } from './pages/robot-page/robot-page.component';
import { OptionsPageComponent } from './pages/options-page/options-page.component';
import { PathFormComponent } from './components/path-form/path-form.component';
import { OptionsFormComponent } from './components/options-form/options-form.component';
import { StateService } from './services/state.service';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    RobotElementComponent,
    RobotPageComponent,
    OptionsPageComponent,
    PathFormComponent,
    OptionsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
