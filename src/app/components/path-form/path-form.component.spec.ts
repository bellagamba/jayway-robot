import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PathFormComponent } from './path-form.component';

describe('PathFormComponent', () => {
  let component: PathFormComponent;
  let fixture: ComponentFixture<PathFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathFormComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
