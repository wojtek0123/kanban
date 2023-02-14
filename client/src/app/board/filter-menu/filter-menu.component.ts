import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css'],
})
export class FilterMenuComponent implements OnInit {
  @Input() tags: string[] | null = null;
  @Output() selectedTags = new EventEmitter<string[]>();
  show = false;
  checkedTags: string[] = [''];

  ngOnInit(): void {
    this.checkedTags = [...this.checkedTags, ...(this.tags ?? [])];
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
