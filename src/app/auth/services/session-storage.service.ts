import { Injectable, Inject } from '@angular/core';
import { AuthModule } from '..';

@Injectable({
  providedIn: AuthModule,
})
export class SessionStorageService {
  constructor(@Inject(Window) private window: Window) {}

  setToken(token: string): void {
    this.window.sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem('token');
  }

  deleteToken(): void {
    this.window.sessionStorage.removeItem('token');
  }
}
