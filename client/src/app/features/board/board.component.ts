import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsideComponent } from './components/aside/aside.component';
import { BoardContentComponent } from './components/board-content/board-content.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsideComponent, BoardContentComponent, BoardHeaderComponent],
})
export class BoardComponent {}
