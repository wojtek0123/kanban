import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupabaseService } from '../../../../services/supabase/supabase.service';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormStatus } from '../../auth.component';
import { Router, RouterLink } from '@angular/router';
import { ApolloService } from '../../../../services/apollo/apollo.service';
import { catchError } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    RouterLink,
    SignUpFormComponent,
  ],
})
export class RegisterComponent {}
