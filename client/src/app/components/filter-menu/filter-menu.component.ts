import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, effect, input } from '@angular/core';
import { MatChipListbox, MatChipOption, MatChipSelectionChange } from '@angular/material/chips';
import { TagBase } from 'src/app/graphql/queries/get-board-name-and-tags.query';

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
    transform: (data: TagBase[]) => {
      return new Set(data);
    },
  });
  @Output() changeSelectionEvent = new EventEmitter<TagBase[]>();

  filteredTags?: Set<TagBase>;

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
