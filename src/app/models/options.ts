import { Coordinates } from 'src/app/models';
import { Direction } from 'src/app/constants';

export interface Options {
  size: number;
  coordinates: Coordinates;
  direction: Direction;
}
