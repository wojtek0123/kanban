import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PROJECTS } from '../graphql.schema';
import { SupabaseService } from '../supabase.service';
import { map, Observable } from 'rxjs';
import { Project } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  constructor(private apollo: Apollo, private supabase: SupabaseService) {}

  getProjects(): Observable<{ projects: Project[] }> {
    const userId = this.supabase.getUserId;

    // if (error) return undefined;

    return this.apollo
      .watchQuery<{ projects: Project[] }>({
        query: GET_PROJECTS,
        variables: { userId },
      })
      .valueChanges.pipe(map(({ data }) => data));
  }
}
