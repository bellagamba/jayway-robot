import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotPageComponent } from './robot-page.component';

describe('RobotPageComponent', () => {
  let component: RobotPageComponent;
  let fixture: ComponentFixture<RobotPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
