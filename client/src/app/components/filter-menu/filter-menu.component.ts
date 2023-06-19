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
  @Input() tagNames: string[] = [];
  @Input() isTaskEditing = false;
  @Output() selectedTags = new EventEmitter<string[]>();
  show = false;
  checkedTags: string[] = [];
  tmpId = '';
  tmpTags: string[] = [];
  isAllTagsSelected = false;

  tags: Tag[] = [];

  ngDoCheck() {
    if (
      this.id !== this.tmpId ||
      this.isTaskEditing ||
      this.tagNames.length !== this.tmpTags.length
    ) {
      this.checkedTags = this.checkedTags.filter(checkedTag =>
        this.tagNames.includes(checkedTag)
      );

      this.checkedTags = [...new Set([...this.checkedTags, ...this.tagNames])];
      this.selectedTags.emit([...this.checkedTags]);
      this.tmpId = this.id;
      this.tmpTags = [...this.tagNames];

      this.tags = this.tagNames.map((tag, index) => ({
        id: index,
        check: true,
        name: tag,
      }));
    }

    this.isAllTagsSelected = this.checkedTags.length === this.tagNames.length;
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
        this.checkedTags = this.tagNames;
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
