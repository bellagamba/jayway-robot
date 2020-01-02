import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from 'src/app/models';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-options-page',
  templateUrl: './options-page.component.html',
  styleUrls: ['./options-page.component.scss']
})
export class OptionsPageComponent implements OnInit {
  private options: Options;

  constructor(private router: Router, private stateService: StateService) {
    this.options = stateService.options;
  }

  ngOnInit() {
  }

  optionsChangedHandler(options: Options) {
    this.stateService.options = options;
    this.router.navigate(['robot']);
  }
}
