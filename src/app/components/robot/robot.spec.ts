import { Robot } from './robot';
import { Direction, CommandType } from '../../constants';

describe('Robot', () => {
  const robot = new Robot();

  it('robot currentDirection', () => {
    const directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];
    directions.forEach((currentDirection) => {
      robot.setDirection(currentDirection);
      expect(robot.currentState.direction).toEqual(currentDirection);
    });
  });

  it('turn right from north', () => {
    robot.setDirection(Direction.NORTH);
    robot.goRight();
    expect(robot.currentState.direction).toEqual(Direction.EAST);
  });

  it('turn right from east', () => {
    robot.setDirection(Direction.EAST);
    robot.goRight();
    expect(robot.currentState.direction).toEqual(Direction.SOUTH);
  });

  it('turn right from south', () => {
    robot.setDirection(Direction.SOUTH);
    robot.goRight();
    expect(robot.currentState.direction).toEqual(Direction.WEST);
  });

  it('turn right from west', () => {
    robot.setDirection(Direction.WEST);
    robot.goRight();
    expect(robot.currentState.direction).toEqual(Direction.NORTH);
  });

  it('turn left from north', () => {
    robot.setDirection(Direction.NORTH);
    robot.goLeft();
    expect(robot.currentState.direction).toEqual(Direction.WEST);
  });

  it('turn left from east', () => {
    robot.setDirection(Direction.EAST);
    robot.goLeft();
    expect(robot.currentState.direction).toEqual(Direction.NORTH);
  });

  it('turn left from south', () => {
    robot.setDirection(Direction.SOUTH);
    robot.goLeft();
    expect(robot.currentState.direction).toEqual(Direction.EAST);
  });

  it('turn left from west', () => {
    robot.setDirection(Direction.WEST);
    robot.goLeft();
    expect(robot.currentState.direction).toEqual(Direction.SOUTH);
  });

  it('robot coordinates', () => {
    robot.setCoordinates(3, 0);
    expect(robot.currentState.coordinates).toEqual({x: 3, y: 0});
  });

  it('other robot coordinates', () => {
    robot.setCoordinates(-2, 5);
    expect(robot.currentState.coordinates).toEqual({x: -2, y: 5});
  });

  it('forward from north', () => {
    robot.setCoordinates(0, 0);
    robot.setDirection(Direction.NORTH);
    robot.goForward();
    expect(robot.currentState.coordinates).toEqual({x: 0, y: 1});
  });

  it('forward from east', () => {
    robot.setCoordinates(0, 0);
    robot.setDirection(Direction.EAST);
    robot.goForward();
    expect(robot.currentState.coordinates).toEqual({x: 1, y: 0});
  });

  it('forward from south', () => {
    robot.setCoordinates(0, 0);
    robot.setDirection(Direction.SOUTH);
    robot.goForward();
    expect(robot.currentState.coordinates).toEqual({x: 0, y: -1});
  });

  it('forward from west', () => {
    robot.setCoordinates(0, 0);
    robot.setDirection(Direction.WEST);
    robot.goForward();
    expect(robot.currentState.coordinates).toEqual({x: -1, y: 0});
  });

  it('command for going left', () => {
    expect(robot.commands('l')).toEqual([CommandType.LEFT]);
  });

  it('command for going right', () => {
    expect(robot.commands('r')).toEqual([CommandType.RIGHT]);
  });

  it('command for going forward', () => {
    expect(robot.commands('s')).toEqual([CommandType.FORWARD]);
  });

  it('sequence of commands', () => {
    expect(robot.commands('RFFL'))
      .toEqual([CommandType.RIGHT, CommandType.FORWARD, CommandType.FORWARD, CommandType.LEFT]);
  });

  it('command robot', () => {
    robot.setState({ coordinates: {x: -2, y: 1}, direction: Direction.EAST });
    robot.exeuteCommands('RLFFLFL');
    expect(robot.currentState.coordinates).toEqual({x: 0, y: 2});
    expect(robot.currentState.direction).toEqual(Direction.WEST);
  });
});
