import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotElementComponent } from './robot-element.component';

describe('RobotElementComponent', () => {
  let component: RobotElementComponent;
  let fixture: ComponentFixture<RobotElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotElementComponent ]
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
