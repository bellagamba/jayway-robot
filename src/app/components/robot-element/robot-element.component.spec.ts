import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RobotElementComponent } from './robot-element.component';

describe('RobotElementComponent', () => {
  let component: RobotElementComponent;
  let fixture: ComponentFixture<RobotElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotElementComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
