import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly _storage = window.sessionStorage;
  constructor() { }

  public put(key: string, value: any) {
    this._storage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    return JSON.parse(this._storage.getItem(key));
  }

  public clearStorage() {
    this._storage.clear();
  }
}
