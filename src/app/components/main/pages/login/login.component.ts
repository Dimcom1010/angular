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

import { Router } from '@angular/router';
import { first, tap } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/User';

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
    private _router: Router,
    private _userService: UserService,
    private _authService: AuthService
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

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      const name = this.validateForm.value.userName;
      const password = this.validateForm.value.password;
      const res = this._authService
        .checkUser(name, password)
        .pipe(first())
        .subscribe((e) => {
          e ? this._authService.login() : this._authService.logout();
          if (e) {
            this._router.navigateByUrl('admin');
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
    const createUser: User = {
      name: 'Новый пользователь',
      password: 'пароль',
    };
    this._userService
      .createUser(createUser)
      .pipe(first())
      .subscribe((e) => console.log(e));
  }
  // updateUser() {
  //   const updateUser: User = {
  //     name: 'MegoName',
  //     password: 'MegoName',
  //   };
  //   this._userService
  //     .updateUser('5', updateUser)
  //     .pipe(first())
  //     .subscribe((e) => console.log(e));
  // }
  // deleteUser() {
  //   this._userService
  //     .deleteUser('4')
  //     .pipe(first())
  //     .subscribe((e) => console.log(e));
  // }
  registration() {
    console.log('registration');
    this._router.navigate(['registration']);
  }
}
