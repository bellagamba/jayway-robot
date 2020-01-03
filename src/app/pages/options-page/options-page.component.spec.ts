import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StateService } from 'src/app/services/state.service';
import { OptionsPageComponent } from './options-page.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class RouterMock {
  navigateByUrl(url: string) {
    return url;
  }
}
describe('OptionsPageComponent', () => {
  let component: OptionsPageComponent;
  let fixture: ComponentFixture<OptionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsPageComponent ],
      providers: [ StateService, {provide: Router, useClass: RouterMock} ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
