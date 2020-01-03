import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PathFormComponent } from './path-form.component';
import { By } from '@angular/platform-browser';

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

  it('should emit an "pathChanged" event when the button is clicked', () => {
    // const button = fixture.nativeElement.querySelector('#exec-path-button');
    spyOn(component.pathChanged, 'emit');
    component.execute();
    // button.click();
    expect(component.pathChanged.emit).toHaveBeenCalled();
  });

  it('should only accpet L|R|F chars', () => {
    spyOn(component.pathChanged, 'emit');

    const inputElement = fixture.nativeElement.querySelector('#path-sequence');
    const path = 'LRFLRFLRFX';
    // tslint:disable-next-line: no-string-literal
    component['pathSequence'] = path;
    fixture.detectChanges();
    inputElement.dispatchEvent(new Event('input'));
    component.execute();
    expect(component.pathChanged.emit).toHaveBeenCalledWith(path.slice(0, -1));
  });

  it('should emit an "pathChanged" event with a valid path sequence argument when the button is clicked', () => {
    // const button = fixture.nativeElement.querySelector('#exec-path-button');
    const path = 'LRFLRFLRF';
    // tslint:disable-next-line: no-string-literal
    component['pathSequence'] = path;

    fixture.detectChanges();

    spyOn(component.pathChanged, 'emit');
    // button.click();
    component.execute();
    expect(component.pathChanged.emit).toHaveBeenCalledWith(path);
  });
});
