import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Options } from 'src/app/models';
import { StateService } from 'src/app/services/state.service';
import { GridComponent } from 'src/app/components/grid/grid.component';

@Component({
  selector: 'app-robot-page',
  templateUrl: './robot-page.component.html',
  styleUrls: ['./robot-page.component.scss'],
})
export class RobotPageComponent {

  @ViewChild(GridComponent, {static: false}) private gridComponent: GridComponent;

  private options: Options;

  constructor(public stateService: StateService) {
    this.options = stateService.options;
  }

  pathChangedHandler(pathSequence: string): void  {
    this.gridComponent.setPathSequence(pathSequence);
  }
}
