import { Component, OnInit } from '@angular/core';
import { Options } from 'src/app/models';
import { Direction } from 'src/app/constants';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-robot-page',
  templateUrl: './robot-page.component.html',
  styleUrls: ['./robot-page.component.scss']
})
export class RobotPageComponent {
  private pathSequence: string;
  private options: Options = {
    size: 20,
    coordinates: { x: 0, y: 0},
    direction: Direction.SOUTH,
  };

  constructor(public stateService: StateService) {
    this.options = stateService.options;
  }

  pathChangedHandler(pathSequence: string): void  {
    this.pathSequence = pathSequence;
  }
}
