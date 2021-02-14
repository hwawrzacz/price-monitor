import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  public singInWithGoogle(): void {
    this._authService.singInWithGoogle();
  }

  public singInWithDeviceId(): void {
    this._authService.signInWithDeviceId();
  }
}
