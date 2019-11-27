console.clear();

import { Observable } from "rxjs";
import {fromEvent} from 'rxjs';
import { of } from 'rxjs';
import { range } from 'rxjs';
import { from } from 'rxjs';
import { interval } from 'rxjs';
import { timer} from 'rxjs';

const observer = {
  next: value => console.log("next", value),
  error: error => console.log("error", error),
  complete: () => console.log("complete")
};
const observable = new Observable(subscriber => {
  subscriber.next("Hello");
  subscriber.next("World");
  subscriber.next("World");
  subscriber.next("Hello");
  subscriber.complete();
  subscriber.next("Hello");
});

// observable.subscribe(observer);


const source$ =  fromEvent(document,'click');

//const subOne = source$.subscribe(observer);
//const subTwo = source$.subscribe(observer);

// setTimeout(()=>{
//   console.log('unsubscribe from one');
//   subOne.unsubscribe();
//   },3000)

const fromSoure$ = of(1,2,3,4,5);
// fromSoure$.subscribe(observer);

const rangeSource$ = range(1,9);
// rangeSource$.subscribe(observer);

const ofSource$ = of([1,2,3,4,5]);
// ofSource$.subscribe(observer);

const fromSource$ = from([1,2,3,4,5]);
// fromSoure$.subscribe(observer);

function* hello(){
  yield 'Hello';
  yield 'World'
}

const fromIteratorSource$ = from(hello());
// fromIteratorSource$.subscribe(observer);

const fromUrlSource$ = from(fetch('https://api.github.com/users/octocat'));
// fromUrlSource$.subscribe(observer);

const intervalSource$ = interval(1000);
// intervalSource$.subscribe(console.log);

const timerSource$ = timer(3000);
// timerSource$.subscribe(console.log);

fromEvent(document, 'scroll').subscribe(console.log);