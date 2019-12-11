import './style.css';
console.clear();

import { Observable } from "rxjs";
import {fromEvent} from 'rxjs';
import { of } from 'rxjs';
import { range } from 'rxjs';
import { from } from 'rxjs';
import { interval } from 'rxjs';
import { timer} from 'rxjs';
import { map, reduce,scan, take} from 'rxjs/operators'

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

/*
 * Calculate progress based on scroll position
 */
function calculateScrollPercent(element) {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

const progressBar: any = document.querySelector('.scroll')

const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
  map(({target})=>
    calculateScrollPercent(target.documentElement)
  )
)

progress$.subscribe(percent =>{progressBar.style.width = `${percent}%`;}
);

const numbers = [1,2,3,4,5];

const totalReducer = (accumulator, currentValue)=> {
//  console.log({accumulator, currentValue});
  return accumulator + currentValue;}


//const total = numbers.reduce(totalReducer,0);

// console.log(total);

// from(numbers).pipe(
//   scan(totalReducer, 0)
// ).subscribe(console.log);

// interval(1000).pipe(
//   take(3),
//   reduce(totalReducer, 0)
// ).subscribe({next: console.log,
// complete: ()=> console.log('complete!')});
const users = [
  {name: 'Brian', loggedIn: false,token :null},
{name: 'Brian', loggedIn: true,token :'abc'},{name: 'Brian', loggedIn: true,token :123}
];

const scanned$ = from(users).pipe(
  scan((accumulatorValue, currentValue)=>{
    return {...accumulatorValue,...currentValue};
  },{})
);

const names$ = scanned$.pipe(
  map(value => value.name)
);

names$.subscribe(console.log);