import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, effect, input } from '@angular/core';
import { MatChipListbox, MatChipOption, MatChipSelectionChange } from '@angular/material/chips';
import { Tag } from 'src/app/models/tag.interface';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatChipListbox, MatChipOption],
})
export class FilterMenuComponent implements OnInit {
  tags = input.required({
    transform: (data: Tag[]) => {
      return new Set(data);
    },
  });
  @Output() changeSelectionEvent = new EventEmitter<Tag[]>();

  filteredTags?: Set<Tag>;

  constructor() {
    effect(() => {
      this.filteredTags = new Set([...this.tags()]);
    });
  }

  ngOnInit(): void {
    this.changeSelectionEvent.emit([...this.tags()]);
  }

  selectionChange(selection: MatChipSelectionChange) {
    if (selection.selected) {
      this.filteredTags?.add(selection.source.value);
    } else {
      this.filteredTags?.delete(selection.source.value);
    }
    this.changeSelectionEvent.emit([...(this.filteredTags ?? [])]);
  }
}
