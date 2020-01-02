import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-path-form',
  templateUrl: './path-form.component.html',
  styleUrls: ['./path-form.component.scss']
})

export class PathFormComponent implements OnInit {
  @Output() pathChanged = new EventEmitter<string>();
  private readonly pathSequenceRegex = new RegExp('^[LRF]*$');
  private pathSequence = '';

  constructor() { }

  ngOnInit() {
  }

  validateSequence(event: KeyboardEvent): void {
    if (this.pathSequence.match(this.pathSequenceRegex) === null) {
      (event.target as HTMLInputElement).value = this.pathSequence.slice(0, -1);
    }
  }

  execute(): void {
    this.pathChanged.emit(this.pathSequence);
  }
}
