import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  get isChecking(): boolean {
    return this._authService.isChecking;
  }

  constructor(private _authService: AuthService) { }

  public singInWithGoogle(): void {
    this._authService.singInWithGoogle();
  }

  public singInWithDeviceId(): void {
    this._authService.signInWithDeviceId();
  }
}
