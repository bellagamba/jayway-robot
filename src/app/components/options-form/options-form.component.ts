import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Direction} from 'src/app/constants';
import { Options } from 'src/app/models';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-options-form',
  templateUrl: './options-form.component.html',
  styleUrls: ['./options-form.component.scss']
})
export class OptionsFormComponent implements OnInit{
  @Input() options: Options;
  @Output() optionsChanged = new EventEmitter<Options>();
  private size = 20;
  private direction: string = Direction.SOUTH.toString();
  private coordinateX = 0;
  private coordinateY = 0;
  private Direction = Direction;

  ngOnInit() {
    this.size = this.options.size;
    this.direction = this.options.direction.toString();
    this.coordinateX = this.options.coordinates.x;
    this.coordinateY = this.options.coordinates.y;
  }

  validateSize(event: KeyboardEvent): void {
    if (!this.size || this.size === 0) {
      this.size = 1;
      (event.target as HTMLInputElement).value = '1';
    }

    this.validateCoordinateX();
    this.validateCoordinateY();
  }

  validateCoordinateX(event: KeyboardEvent = null) {
    if (!this.coordinateX) {
      this.coordinateX = 0;
    }
    if (this.coordinateX > this.size - 1) {
      this.coordinateX = this.size - 1;
    }
    if (event !== null) {
      (event.target as HTMLInputElement).value = this.coordinateX.toString();
    }
  }

  validateCoordinateY(event: KeyboardEvent = null) {
    if (this.coordinateY === null) {
      this.coordinateY = 0;
    }
    if (this.coordinateY > this.size - 1) {
      this.coordinateY = this.size - 1;
    }
    if (event !== null) {
      (event.target as HTMLInputElement).value = this.coordinateY.toString();
    }
  }

  start(): void {
    let direction = Direction.SOUTH;
    switch (this.direction) {
      case Direction.NORTH.toString():
        direction = Direction.NORTH;
        break;
      case Direction.EAST.toString():
        direction = Direction.EAST;
        break;
      case Direction.WEST.toString():
        direction = Direction.WEST;
        break;
      case Direction.SOUTH.toString():
        direction = Direction.SOUTH;
        break;
    }

    const options = {
      size : this.size,
      coordinates: { x: this.coordinateX, y: this.coordinateY },
      direction,
    };

    this.optionsChanged.emit(options);
  }
}
