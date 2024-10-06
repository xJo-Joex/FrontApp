import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  authService  =  inject(AuthService)
  router  =  inject(Router);

  errorMessage: string | null = null
  public signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  public onSubmit() {
    this.errorMessage = null
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authService.signup(this.signupForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['/login']);
         
          },
          error: (err) => {  
            this.errorMessage = err.error?.message?.includes("dup key") ? "Username ya existe" : err?.error?.message;
            if(this.errorMessage === undefined){
              this.errorMessage = err.message
            }
            console.error('Error de registro:', err);
          }
        });
    }else{
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
    }
  }

  ngOnInit() {
    this.errorMessage = null;
  }
}
