import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Tag } from 'src/app/models/tag.models';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterMenuComponent implements DoCheck {
  @Input() id = '';
  @Input() tags: Tag[] = [];
  @Input() isTaskEditing = false;
  @Output() selectedTags = new EventEmitter<string[]>();
  show = false;
  checkedTags: string[] = [''];
  tmpId = '';
  tmpTags: Tag[] = [];

  ngDoCheck() {
    if (
      this.id !== this.tmpId ||
      this.isTaskEditing ||
      this.tags.length !== this.tmpTags.length
    ) {
      this.checkedTags = [
        ...this.checkedTags,
        ...this.tags.flatMap(tag => tag.name),
        '',
      ];
      this.selectedTags.emit(this.checkedTags);
      this.tmpId = this.id;
      this.tmpTags = [...this.tags];
    }
  }

  onToggle() {
    this.show = !this.show;
  }

  onFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!this.checkedTags) return;

    if (!event) return;

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
