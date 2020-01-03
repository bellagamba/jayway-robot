import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GridComponent } from './grid.component';
import { Direction } from 'src/app/constants';
import { Options } from 'src/app/models';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should execute a path sequence and display the final state', () => {
    const pathSequence = 'LRFFRF';
    const options: Options = {
      size: 20,
      coordinates: { x: 0, y: 0},
      direction: Direction.SOUTH,
    };
    component.options = options;
    component.setPathSequence(pathSequence, 0);
    // tslint:disable-next-line: no-string-literal
    expect(component['gridCoordinates'].x).toEqual(0);
    // tslint:disable-next-line: no-string-literal
    expect(component['gridCoordinates'].y).toEqual(2);
    // tslint:disable-next-line: no-string-literal
    expect(component['translatedDirection']).toEqual('West');
  });
});
