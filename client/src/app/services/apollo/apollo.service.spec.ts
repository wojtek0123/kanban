import { TestBed } from '@angular/core/testing';
import { ApolloService } from './apollo.service';
import { SupabaseService } from '../supabase/supabase.service';
import { take } from 'rxjs';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { Project } from 'src/app/models/project.model';

describe('ProjectItemsService', () => {
  let service: ApolloService;
  let supabaseServiceSpy: jasmine.SpyObj<SupabaseService>;

  beforeEach(() => {
    const supabaseServiceSpyObj = jasmine.createSpyObj('SupabaseService', [
      'getSession$',
    ]);
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [
        {
          provide: SupabaseService,
          useValue: supabaseServiceSpyObj,
        },
      ],
    });
    service = TestBed.inject(ApolloService);
    supabaseServiceSpy = TestBed.inject(
      SupabaseService
    ) as jasmine.SpyObj<SupabaseService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set project owner id', () => {
    const project: Project = {
      id: '1',
      name: 'test name',
      boards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1234',
      users: [],
    };

    service.setProjectOwnerId(project.userId);

    service['_projectOwnerId'].pipe(take(1)).subscribe(userId => {
      expect(userId).toBe('1234');
    });
  });
});
