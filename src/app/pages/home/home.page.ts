import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private _testCollection$: Observable<any>;

  constructor(private _firestore: AngularFirestore) { }

  public ngOnInit(): void {
    this._testCollection$ = this._firestore.collection('test').valueChanges();
    this.observeCollectionChanges();
  }

  public openSettingsDialog(): void {
    console.log('Settings');
  }

  private observeCollectionChanges(): void {
    this._testCollection$
      .pipe(
        tap(info => console.log(info))
      )
      .subscribe()
  }

  private handleResponse(response: any): void {
    console.log(response, 'potential succes');
  }

  private handleError(error: any): void {
    console.error(error);
  }
}