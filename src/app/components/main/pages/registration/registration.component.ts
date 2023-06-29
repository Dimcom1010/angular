import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../models/User';
import { first, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-registration',
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
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
})
export class RegistrationComponent implements OnInit {
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
      checkPassword: [null, [Validators.required]],
    });
  }

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      const name = this.validateForm.value.userName;
      const password = this.validateForm.value.password;

      const res = this._authService.checkUserName(name).pipe(first());

      res.subscribe((e) => {
        !e && this.createUser(name, password);
      });
    }
  }
  // getUsers() {
  //   this._userService
  //     .getUsers()
  //     .pipe(first())
  //     .subscribe((e) => console.log(e));
  // }
  createUser(name: string, password: string) {
    const createUser: User = { name, password };
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
  goLogin() {
    this._router.navigate(['login']);
  }
}
