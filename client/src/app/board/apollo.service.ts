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

  async getProjects(): Promise<Observable<{ projects: Project[] }>> {
    const { data } = await this.supabase.getSession();

    // if (error) return undefined;

    return this.apollo
      .watchQuery<{ projects: Project[] }>({
        query: GET_PROJECTS,
        variables: { userId: data.session?.user.id },
      })
      .valueChanges.pipe(map(({ data }) => data));
  }
}
