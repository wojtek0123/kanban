import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuComponent implements DoCheck {
  @Input() tags: string[] = [];
  @Output() selectedTags = new EventEmitter<string[]>();
  show = false;
  checkedTags: string[] = [''];

  ngDoCheck() {
    this.checkedTags = [...this.checkedTags, ...this.tags];
    this.selectedTags.emit(this.checkedTags);
  }

  onToggleFilter() {
    this.show = !this.show;
  }

  onFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!this.checkedTags) return;

    if (!target.classList.contains('checkbox')) return;
    const isChecked = target.checked;

    if (isChecked && !this.checkedTags.includes(target.value)) {
      this.checkedTags = [...this.checkedTags, target.value];
    }

    if (!isChecked && this.checkedTags.includes(target.value)) {
      this.checkedTags = this.checkedTags.filter(tag => tag !== target.value);
    }

    this.selectedTags.emit(this.checkedTags);
  }
}
