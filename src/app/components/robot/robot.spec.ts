import { Robot } from './robot';
import { Direction, CommandType } from '../../constants';

describe('Robot', () => {
  const robot = new Robot(20);

  it('should set robot currentDirection', () => {
    const directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];
    directions.forEach((currentDirection) => {
      robot.setDirection(currentDirection);
      expect(robot.currentState.direction).toEqual(currentDirection);
    });
  });

  it('should turn right from north', () => {
    robot.setDirection(Direction.NORTH);
    robot.goRight();
    expect(robot.currentState.direction).toEqual(Direction.EAST);
  });

  it('should turn right from east', () => {
    robot.setDirection(Direction.EAST);
    robot.goRight();
    expect(robot.currentState.direction).toEqual(Direction.SOUTH);
  });

  it('should turn right from south', () => {
    robot.setDirection(Direction.SOUTH);
    robot.goRight();
    expect(robot.currentState.direction).toEqual(Direction.WEST);
  });

  it('should turn right from west', () => {
    robot.setDirection(Direction.WEST);
    robot.goRight();
    expect(robot.currentState.direction).toEqual(Direction.NORTH);
  });

  it('should turn left from north', () => {
    robot.setDirection(Direction.NORTH);
    robot.goLeft();
    expect(robot.currentState.direction).toEqual(Direction.WEST);
  });

  it('should turn left from east', () => {
    robot.setDirection(Direction.EAST);
    robot.goLeft();
    expect(robot.currentState.direction).toEqual(Direction.NORTH);
  });

  it('should turn left from south', () => {
    robot.setDirection(Direction.SOUTH);
    robot.goLeft();
    expect(robot.currentState.direction).toEqual(Direction.EAST);
  });

  it('should turn left from west', () => {
    robot.setDirection(Direction.WEST);
    robot.goLeft();
    expect(robot.currentState.direction).toEqual(Direction.SOUTH);
  });

  it('should set initial coordinates', () => {
    robot.setCoordinates(3, 0);
    expect(robot.currentState.coordinates).toEqual({x: 3, y: 0});
  });

  it('should not set negative coordinates', () => {
    robot.setCoordinates(-2, -3);
    expect(robot.currentState.coordinates).toEqual({x: 0, y: 0});
  });

  it('should not set coordinates greater then size', () => {
    robot.setCoordinates(22, 22);
    expect(robot.currentState.coordinates).toEqual({x: 19, y: 19});
  });

  it('should go forward from north', () => {
    robot.setCoordinates(0, 0);
    robot.setDirection(Direction.NORTH);
    robot.goForward();
    expect(robot.currentState.coordinates).toEqual({x: 0, y: 0});
  });

  it('should go forward from east', () => {
    robot.setCoordinates(0, 0);
    robot.setDirection(Direction.EAST);
    robot.goForward();
    expect(robot.currentState.coordinates).toEqual({x: 1, y: 0});
  });

  it('should go forward from south', () => {
    robot.setCoordinates(0, 0);
    robot.setDirection(Direction.SOUTH);
    robot.goForward();
    expect(robot.currentState.coordinates).toEqual({x: 0, y: 1});
  });

  it('should go forward from west', () => {
    robot.setCoordinates(0, 0);
    robot.setDirection(Direction.WEST);
    robot.goForward();
    expect(robot.currentState.coordinates).toEqual({x: 0, y: 0});
  });

  it('should recognize command for going left', () => {
    expect(robot.splitPathSequence('L')).toEqual([CommandType.LEFT]);
  });

  it('should recognize command for going right', () => {
    expect(robot.splitPathSequence('R')).toEqual([CommandType.RIGHT]);
  });

  it('should recognize command for going forward', () => {
    expect(robot.splitPathSequence('F')).toEqual([CommandType.FORWARD]);
  });

  it('should recognize a sequence of commands', () => {
    expect(robot.splitPathSequence('RFFL'))
      .toEqual([CommandType.RIGHT, CommandType.FORWARD, CommandType.FORWARD, CommandType.LEFT]);
  });

  it('should execute a path sequence', () => {
    robot.setState({ coordinates: {x: 1, y: 1}, direction: Direction.EAST });
    robot.executePath('RFFLFL', 0);
    expect(robot.currentState.coordinates).toEqual({x: 2, y: 3});
    expect(robot.currentState.direction).toEqual(Direction.NORTH);
  });

  it('should skip commands that lead out of size boundaries', () => {
    robot.setState({ coordinates: {x: 1, y: 1}, direction: Direction.SOUTH });
    robot.executePath('RRFFLFFFF', 0);
    expect(robot.currentState.coordinates).toEqual({x: 0, y: 0});
    expect(robot.currentState.direction).toEqual(Direction.WEST);
  });

  it('should emit "stateChanged" event when single command is executed', () => {
    spyOn(robot.stateChanged, 'emit');
    robot.setDirection(Direction.SOUTH);
    robot.goForward();
    expect(robot.stateChanged.emit).toHaveBeenCalled();
  });

  it('should emit "pathExecuted" event when path is executed', () => {
    spyOn(robot.pathExecuted, 'emit');
    robot.setState({ coordinates: {x: 1, y: 1}, direction: Direction.SOUTH });
    robot.executePath('RRFFLFFFF', 0);
    expect(robot.currentState.coordinates).toEqual({x: 0, y: 0});
    expect(robot.currentState.direction).toEqual(Direction.WEST);
    expect(robot.pathExecuted.emit).toHaveBeenCalled();
  });
});
