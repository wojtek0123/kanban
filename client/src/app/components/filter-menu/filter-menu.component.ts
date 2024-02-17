import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Tag } from 'src/app/models/tag.models';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
})
export class FilterMenuComponent implements OnChanges {
  @Input() tags: Tag[] = [];
  @Output() selectedTags = new EventEmitter<string[]>();
  show = false;
  checkedTags: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.checkedTags = [...this.tags.map(tag => tag.name)];
    this.selectedTags.emit([...this.checkedTags]);
  }

  onToggle() {
    this.show = !this.show;
  }

  onFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;

    if (target.classList.contains('select-all')) {
      if (isChecked) {
        for (const tag of this.tags) {
          tag.check = true;
        }
        this.checkedTags = this.tags.map(tag => tag.name);
        this.selectedTags.emit(this.checkedTags);
      } else {
        for (const tag of this.tags) {
          tag.check = false;
        }
        this.checkedTags = [];
        this.selectedTags.emit(this.checkedTags);
      }
    }

    if (!target.classList.contains('checkbox')) return;

    if (isChecked && !this.checkedTags.includes(target.value)) {
      this.tags[+target.id].check = true;
      this.checkedTags = [...this.checkedTags, target.value];
    }

    if (!isChecked && this.checkedTags.includes(target.value)) {
      this.tags[+target.id].check = false;
      this.checkedTags = this.checkedTags.filter(tag => tag !== target.value);
    }

    this.selectedTags.emit(this.checkedTags);
  }
}
