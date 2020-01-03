import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RobotPageComponent } from './robot-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

describe('RobotPageComponent', () => {
  let component: RobotPageComponent;
  let fixture: ComponentFixture<RobotPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotPageComponent ],
      providers: [ StateService ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
