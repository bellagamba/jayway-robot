import { Direction } from '../constants';
import { Coordinates } from './coordinates';

export interface RobotState {
  direction: Direction;
  coordinates: Coordinates;
}
