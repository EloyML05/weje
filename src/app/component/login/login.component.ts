import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule ,CommonModule,FormsModule],
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  token: string = '';
  constructor(private oAuthService: AuthService) {
    this.createForm();
  }

  ngOnInit() {}
  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      this.oAuthService.getToken(this.loginForm?.value).subscribe((data) => {
        this.token = data;
      });
    }
  }
}
