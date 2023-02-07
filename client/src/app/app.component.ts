import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'kanban-angular';

  constructor(private supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    await this.supabase.refreshSession();
  }
}
