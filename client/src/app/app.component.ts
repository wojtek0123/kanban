import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'kanban-angular';

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.supabase.refreshSession();
  }
}
