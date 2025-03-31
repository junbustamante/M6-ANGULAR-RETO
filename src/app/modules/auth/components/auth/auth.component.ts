import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateLogin } from 'src/app/state/state-login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private state: StateLogin, private router: Router) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void{
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      if(usuario === 'junior' && password === '12345678') {
        console.log('Usuario logueado');
        this.state.userEmail = 'djbustam@gmail.com';
        console.log('Usuario logueado2');
        this.router.navigate(['/auth/boards']);
      }else {
        alert('Usuario o contraseña incorrectos');
      }
    } 
  }
}
