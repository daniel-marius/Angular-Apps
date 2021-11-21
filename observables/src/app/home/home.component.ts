import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {
    this.firstObsSubscription = interval(1000).subscribe((count) => {
      console.log(count);
    });
  }

  ngOnInit() {
    const customIntervalObservable = new Observable((observer) => {
      let count: number = 0;
      setInterval(() => {
        if (count === 2) {
          observer.complete();
        }
        observer.next(count);
        if (count > 3) {
          observer.error(new Error('above 3'));
        }
        count += 1;
      }, 1000);
    });

    customIntervalObservable.pipe(
      map((data) => {
        return data;
      })
    );

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        map((data) => {
          return data;
        })
      )
      .subscribe(
        (x) => console.log('Observer got a next value: ' + x),
        (err) => console.error('Observer got an error: ' + err),
        () => console.log('Observer got a complete notification')
      );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
