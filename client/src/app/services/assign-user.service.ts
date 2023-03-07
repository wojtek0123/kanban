import { Injectable } from '@angular/core';
import { TabNameAssign } from '../models/types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignUserService {
  private tabName = new BehaviorSubject<TabNameAssign>('peek');

  get getTabName(): Observable<TabNameAssign> {
    return this.tabName;
  }

  changeTab(tabName: TabNameAssign) {
    this.tabName.next(tabName);
  }
}
