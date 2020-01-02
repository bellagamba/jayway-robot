import { Component } from '@angular/core';
import { Options } from './models';
import { Direction } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private options: Options = {
    size: 20,
    coordinates: { x: 0, y: 0},
    direction: Direction.SOUTH,
  };

  optionsChangedHandler(options: Options): void  {
    this.options = options;
  }
}
