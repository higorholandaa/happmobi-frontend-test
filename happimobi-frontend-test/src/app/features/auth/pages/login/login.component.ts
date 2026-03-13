import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { APP_ASSETS } from '@core/constants/assets.constants';

// Tela de login: valida o formulário e redireciona para /home ao autenticar
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly logoSrc = APP_ASSETS.ui.logo;
  loginError = false;

  // Campos obrigatórios: e-mail válido e senha
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // Tenta autenticar; em caso de sucesso navega para a home
  onSubmit(): void {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    const sucesso = this.authService.login(email!, password!);

    if (sucesso) {
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
    }
  }
}

