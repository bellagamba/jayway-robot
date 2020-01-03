import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Robot } from '../robot/robot';
import { RobotState, Options } from 'src/app/models';
import { Coordinates } from 'src/app/models';
import { Direction } from 'src/app/constants';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() public set options(options: Options) {
    this.initGrid(options);
  }

  @Output() pathExecuted = new EventEmitter();

  private canvasContext: CanvasRenderingContext2D;
  private cellSize = 30;
  private size = 20;
  private canvasSize =  this.cellSize * this.size;
  private translateFix = 0.5;
  private robot: Robot = new Robot(this.size);
  private currentRobotElementState: RobotState = this.robot.currentState;
  private gridCoordinates: Coordinates = this.robot.currentState.coordinates;
  private translatedDirection = '';
  private executingPath = false;
  constructor() { }

  ngOnInit(): void {
    this.robot.stateChanged.subscribe(
      (robotState: RobotState) => {
        this.setRobotElementInfo(robotState);
        this.setRobotElementState(robotState);
      }
    );

    this.robot.pathExecuted.subscribe(
      () => {
        this.executingPath = false;
        this.pathExecuted.emit();
      }
    );
  }

  setPathSequence(pathSequence: string, intervalDuration?: number): void {
    if (pathSequence !== undefined && pathSequence.length > 0 && !this.executingPath) {
      this.executingPath = true;
      this.robot.executePath(pathSequence, intervalDuration);
    }
  }

  initGrid(options: Options): void {
    this.size = options.size;
    this.canvasSize =  this.cellSize * this.size;
    this.initGridCanvas();
    this.drawGrid();
    this.robot.setSize(this.size);
    const robotState = {
      direction: options.direction,
      coordinates: options.coordinates
    };
    this.robot.setState(robotState);
    this.setRobotElementState(robotState);
    this.setRobotElementInfo(robotState);
  }

  setRobotElementInfo(robotState: RobotState): void {
    this.gridCoordinates = robotState.coordinates;
    this.translatedDirection = this.translateDirection(robotState.direction);
  }

  translateDirection(direction: Direction): string {
    switch (direction) {
      case Direction.NORTH:
        return 'North';
      case Direction.EAST:
        return 'East';
      case Direction.SOUTH:
        return 'South';
      case Direction.WEST:
        return 'West';
    }
  }

  setRobotElementState(robotState: RobotState): void {
    this.currentRobotElementState = { ...robotState };
    this.currentRobotElementState.coordinates = {
      x: this.coordinateToPixel(robotState.coordinates.x),
      y: this.coordinateToPixel(robotState.coordinates.y)
    };
  }

  coordinateToPixel(value: number): number {
    return value * this.cellSize;
  }

  initGridCanvas(): void {
    const gridCanvas = document.getElementById('grid-canvas') as HTMLCanvasElement;
    this.canvasContext = gridCanvas.getContext('2d');
    gridCanvas.width  = this.canvasSize;
    gridCanvas.height = this.canvasSize;
  }

  drawGrid(): void {
    const lineColor = '#aaa';
    for (let pos = this.translateFix + this.cellSize, i = 0; i < this.size; pos += this.cellSize, i++) {
      this.canvasContext.beginPath();
      this.canvasContext.strokeStyle = lineColor;
      this.canvasContext.lineWidth = 1;
      this.canvasContext.moveTo(pos, 0);
      this.canvasContext.lineTo(pos, this.canvasSize);
      this.canvasContext.moveTo(0, pos);
      this.canvasContext.lineTo(this.canvasSize, pos);
      this.canvasContext.stroke();
      this.canvasContext.closePath();
    }

    this.canvasContext.fill();
  }
}
