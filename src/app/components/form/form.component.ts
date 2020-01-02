import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Direction} from 'src/app/constants';
import { Options } from 'src/app/models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() optionsChanged = new EventEmitter<Options>();
  private readonly pathSequenceRegex = new RegExp('^[LRF]*$');
  private pathSequence = '';
  private size = 20;
  private direction: string = Direction.SOUTH.toString();
  private coordinateX = 0;
  private coordinateY = 0;
  private Direction = Direction;
  constructor() { }

  ngOnInit() {
  }

  validateSequence(event: KeyboardEvent): void {
    if (this.pathSequence.match(this.pathSequenceRegex) === null) {
      (event.target as HTMLInputElement).value = this.pathSequence.slice(0, -1);
    }
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

  apply(): void {
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
      pathSequence: this.pathSequence,
      size : this.size,
      coordinates: { x: this.coordinateX, y: this.coordinateY },
      direction,
    };

    this.optionsChanged.emit(options);
  }
}
