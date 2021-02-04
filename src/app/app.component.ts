import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private _testCollection$: Observable<any>;

  constructor(private _firestore: AngularFirestore) { }

  public ngOnInit(): void {
    this._testCollection$ = this._firestore.collection('test').valueChanges();
    this.observeCollectionChanges();
    this.addTestData();
  }

  private observeCollectionChanges(): void {
    this._testCollection$
      .pipe(
        tap(info => console.log(info))
      )
      .subscribe()
  }

  private addTestData(): void {
    this._firestore.collection('test').add({
      firstName: 'Jimmie',
      lastName: 'Giant',
      age: 27
    })
      .then(res => this.handleResponse(res))
      .catch(err => this.handleError(err))
  }

  private handleResponse(response: any): void {
    console.log(response, 'potential succes');
  }

  private handleError(error: any): void {
    console.error(error);
  }
}
