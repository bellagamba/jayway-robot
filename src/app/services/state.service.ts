import { Injectable } from '@angular/core';
import { Options } from '../models';
import { Direction } from '../constants';

/**
 * Appe data service.
 */
@Injectable()
export class StateService {
  options: Options = {
    size: 20,
    coordinates: { x: 0, y: 0},
    direction: Direction.SOUTH,
  };
}
