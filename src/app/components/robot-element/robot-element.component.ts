import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Coordinates } from 'src/app/models/coordinates';
import { RobotState } from 'src/app/models/robot-state';
import { Direction } from 'src/app/constants';

@Component({
  selector: 'app-robot-element',
  templateUrl: './robot-element.component.html',
  styleUrls: ['./robot-element.component.scss']
})
export class RobotElementComponent implements OnInit {
  @Input() size: number;
  @Input() public set robotState(robotState: RobotState) {
    this.drawElement(robotState);
  }
  @HostBinding('style.width') get width() {
    return this.size + 'px';
  }
  @HostBinding('style.height') get height() {
    return this.size + 'px';
  }
  @HostBinding('style.left') get left() {
    return this.coordinates.x + 'px';
  }
  @HostBinding('style.top') get top() {
    return this.coordinates.y + 'px';
  }
  @HostBinding('style.transform') get direction() {
    return 'rotate(' + this.rotationDegree + 'deg)';
  }

  private rotationDegree = 0;
  private prevDirection = Direction.SOUTH;

  private coordinates: Coordinates = { x: 0, y: 0};

  ngOnInit() {
  }

  fixCoordinate(value: number): number {
    return value + 1;
  }

  drawElement(robotState: RobotState): void  {
    if (!robotState) {
      return;
    }

    this.coordinates = { x: this.fixCoordinate(robotState.coordinates.x), y: this.fixCoordinate(robotState.coordinates.y)};
    this.setRotation(robotState);
  }

  setRotation(robotState: RobotState): void {
    switch (this.prevDirection) {
      case (Direction.SOUTH):
        switch (robotState.direction) {
          case Direction.WEST:
            this.rotationDegree += 90;
            break;
          case Direction.EAST:
            this.rotationDegree -= 90;
            break;
        }
        break;
      case Direction.NORTH:
        switch (robotState.direction) {
          case Direction.WEST:
            this.rotationDegree -= 90;
            break;
          case Direction.EAST:
            this.rotationDegree += 90;
            break;
        }
        break;
      case Direction.WEST:
        switch (robotState.direction) {
          case Direction.NORTH:
            this.rotationDegree += 90;
            break;
          case Direction.SOUTH:
            this.rotationDegree -= 90;
            break;
        }
        break;
      case Direction.EAST:
        switch (robotState.direction) {
          case Direction.NORTH:
            this.rotationDegree -= 90;
            break;
          case Direction.SOUTH:
            this.rotationDegree += 90;
            break;
        }
        break;
    }

    this.prevDirection = robotState.direction;
  }
}
