import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const login = this.validateForm.value.userName;
      const password = this.validateForm.value.password;
      if (login === 'admin' && password === 'admin') {
        console.log(this._authService.isAdmin());
        this._authService.login();
        console.log(this._authService.isAdmin());
      }
    } else {
      this._authService.logout();
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  getUsers() {
    this._userService
      .getUsers()
      .pipe(first())
      .subscribe((e) => console.log(e));
  }
  createUser() {
    this._userService
      .createUser('Новый')
      .pipe(first())
      .subscribe((e) => console.log(e));
  }
  updateUser() {
    this._userService
      .updateUser('1', 'Страый')
      .pipe(first())
      .subscribe((e) => console.log(e));
  }
  deleteUser() {
    this._userService
      .deleteUser('q')
      .pipe(first())
      .subscribe((e) => console.log(e));
  }
}
