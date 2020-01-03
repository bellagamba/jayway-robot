import { Direction, Command, CommandType } from 'src/app/constants';
import { RobotState } from 'src/app/models/robot-state';
import { Output, EventEmitter } from '@angular/core';
import { Coordinates } from 'src/app/models/coordinates';

export class Robot {
  currentState: RobotState = {
    direction: Direction.SOUTH,
    coordinates: {x: 0, y: 0},
  };

  private size = 0;

  @Output() stateChanged = new EventEmitter<RobotState>();

  constructor(size: number = 0) {
    this.setSize(size);
  }

  exeuteCommands(commands: string, intervalDuration = 500): void {
    const instructions = this.commands(commands);
    let index = 0;
    if (intervalDuration === 0) {
      for (index = 0; index < commands.length; index++) {
        this.executeSingleCommand(instructions[index]);
      }
      return;
    }

    const interval = setInterval(() => {
      this.executeSingleCommand(instructions[index]);
      if (index < instructions.length - 1) {
        index++;
      } else {
        clearInterval(interval);
      }
    }, intervalDuration);
  }

  executeSingleCommand(command: CommandType) {
    switch (command) {
      case CommandType.RIGHT:
        this.goRight();
        break;
      case CommandType.LEFT:
        this.goLeft();
        break;
      case CommandType.FORWARD:
        this.goForward();
        break;
    }
  }

  setState(robotState: RobotState): void {
    this.setCoordinates(robotState.coordinates.x, robotState.coordinates.y);
    this.setDirection(robotState.direction);
  }

  setDirection(direction: Direction) {
    this.currentState.direction = direction;
  }

  setCoordinates(x: number, y: number) {
    this.currentState.coordinates = {x, y};
  }

  setSize(size: number = 0) {
    this.size = size;
  }

  goRight(): void {
    switch (this.currentState.direction) {
      case Direction.NORTH:
        this.currentState.direction = Direction.EAST;
        break;
      case Direction.EAST:
        this.currentState.direction = Direction.SOUTH;
        break;
      case Direction.SOUTH:
        this.currentState.direction = Direction.WEST;
        break;
      case Direction.WEST:
        this.currentState.direction = Direction.NORTH;
        break;
    }

    this.stateChanged.emit(this.currentState);
  }

  goLeft(): void {
    switch (this.currentState.direction) {
      case Direction.NORTH:
        this.currentState.direction = Direction.WEST;
        break;
      case Direction.EAST:
        this.currentState.direction = Direction.NORTH;
        break;
      case Direction.SOUTH:
        this.currentState.direction = Direction.EAST;
        break;
      case Direction.WEST:
        this.currentState.direction = Direction.SOUTH;
        break;
    }

    this.stateChanged.emit(this.currentState);
  }

 goForward(): void {
    let coordinates: Coordinates;
    switch (this.currentState.direction) {
      case Direction.NORTH:
        coordinates = { x: this.currentState.coordinates.x,  y: this.currentState.coordinates.y - 1};
        break;
      case Direction.EAST:
        coordinates = { x: this.currentState.coordinates.x + 1,  y: this.currentState.coordinates.y};
        break;
      case Direction.SOUTH:
        coordinates = { x: this.currentState.coordinates.x,  y: this.currentState.coordinates.y + 1};
        break;
      case Direction.WEST:
        coordinates = { x: this.currentState.coordinates.x - 1,  y: this.currentState.coordinates.y};
        break;
    }

    if (this.size !== 0) {
      coordinates.x = (coordinates.x >= this.size - 1) ? this.size - 1 : coordinates.x;
      coordinates.y = (coordinates.y >= this.size - 1) ? this.size - 1 : coordinates.y;
      coordinates.x = (coordinates.x < 0) ? 0 : coordinates.x;
      coordinates.y = (coordinates.y < 0) ? 0 : coordinates.y;
    }

    this.setCoordinates(coordinates.x, coordinates.y);
    this.stateChanged.emit(this.currentState);
  }

 commands(values: string): Command[] {
    const result: Command[] = [];
    const valuesList = values.split('');
    valuesList.forEach(value => {
      switch (value) {
        case 'L':
          result.push(CommandType.LEFT);
          break;
        case 'R':
          result.push(CommandType.RIGHT);
          break;
        case 'F':
          result.push(CommandType.FORWARD);
          break;
        default:
          throw new Error('Command ${value} not valid');
      }
    });

    return result;
  }
}
