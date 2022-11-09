import { Component, Input } from '@angular/core';
import { FormService } from '../../form/form.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
})
export class ContextMenuComponent {
  @Input() id = '';
  @Input() type = '';
  showMenu = false;

  constructor(private formService: FormService) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  delete() {
    console.log(this.type);
    this.showMenu = false;
    //  apollo mutation delete
  }

  edit() {
    this.showMenu = false;
    this.formService.onChangeFormVisibility();
    //  apollo mutation update
    // pass the information about the editing object
  }
}
