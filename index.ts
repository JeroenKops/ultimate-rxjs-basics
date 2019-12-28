console.clear();

import {of, interval, fromEvent} from 'rxjs'
import {startWith, endWith,mapTo,scan,tap, takeUntil, takeWhile} from 'rxjs/operators'

// ------ startWith and endWith ------

// const number$ = of(1,2,3);
//
// number$.pipe(
//   startWith('a','b','c'),
//   endWith('x','y','z')
// ).subscribe(
//   console.log
// )


//elem
const count = document.getElementById('count');
const abort = document.getElementById('abort');
const message = document.getElementById('message');
const COUNTDOWN_FROM = 20;

// obs
const abortClick$ = fromEvent(abort, 'click');
const counter$ = interval(1000);


counter$.pipe(
  mapTo(-1),
  scan((accumulator, current)=>{
    return accumulator + current;
  },COUNTDOWN_FROM),
  takeWhile( value => value >= 0),
  takeUntil(abortClick$),
  startWith(COUNTDOWN_FROM)
).subscribe(value => {
    count.innerHTML = value;
    if(!value){
      message.innerHTML = 'Liftoff!';
    }
  }
);
