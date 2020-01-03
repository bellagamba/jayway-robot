import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { OptionsFormComponent } from './options-form.component';

describe('OptionsFormComponent', () => {
  let component: OptionsFormComponent;
  let fixture: ComponentFixture<OptionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsFormComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have <button> with "Apply options" text', () => {
    const button = fixture.nativeElement.querySelector('#apply-button');
    expect(button.textContent).toEqual('Apply options');
  });

  it('should emit an "optionsChanged" event when the button is clicked', () => {
    const button = fixture.nativeElement.querySelector('#apply-button');
    spyOn(component.optionsChanged, 'emit');
    component.start();
   // button.click();
    expect(component.optionsChanged.emit).toHaveBeenCalled();
  });

  it('should emit an "optionsChanged" event with an Options object argument when the button is clicked', () => {
    const button = fixture.nativeElement.querySelector('#apply-button');
    const sizeInput = fixture.nativeElement.querySelector('#size');
    const coordinateXInput = fixture.nativeElement.querySelector('#coordinateX');
    const coordinateYInput = fixture.nativeElement.querySelector('#coordinateY');
    const directionSelect = fixture.nativeElement.querySelector('#direction');
    // tslint:disable-next-line: no-string-literal
    component['size'] = 10;
    // tslint:disable-next-line: no-string-literal
    component['direction'] = '0';
    // tslint:disable-next-line: no-string-literal
    component['coordinateX'] = 1;
    // tslint:disable-next-line: no-string-literal
    component['coordinateY'] = 12;

    fixture.detectChanges();

    spyOn(component.optionsChanged, 'emit');
    // button.click();
    component.start();
    const options = {
      size : sizeInput.ngModel,
      coordinates: { x: coordinateXInput.ngModel, y: coordinateYInput.ngModel },
      direction: parseInt(directionSelect.ngModel, 10),
    };
    expect(component.optionsChanged.emit).toHaveBeenCalledWith(options);
  });
});
