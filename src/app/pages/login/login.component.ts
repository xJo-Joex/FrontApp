import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  errorMessage: string | null = null;

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  onSubmit() {
    this.errorMessage = null;
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: (data: any) => {
            if (this.authService.isLoggedIn()) {
              this.router.navigate(['/pay']);
            }
            console.log(data);
          },
          error: (error: any) => {
            if (error.status == 400) {
              this.errorMessage = 'Error en la autenticación. Verifica tus credenciales.';
            } else {
              this.errorMessage = error.message;
            }
            console.error('Error de login:', error);
          }
        });
    } else {
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
    }
  }
  
  ngOnInit() {
    this.errorMessage = null;
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/pay']);
    }
  }

}
