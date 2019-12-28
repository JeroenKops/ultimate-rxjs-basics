console.clear();

import {of, interval, fromEvent, concat, merge,empty} from 'rxjs'
import {startWith, endWith,mapTo,scan,tap, takeUntil, takeWhile, take,delay, concat as concatOp, switchMap} from 'rxjs/operators'

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
// const count = document.getElementById('count');
// const abort = document.getElementById('abort');
// const message = document.getElementById('message');
// const COUNTDOWN_FROM = 20;

// // obs
// const abortClick$ = fromEvent(abort, 'click');
// const counter$ = interval(1000);


// counter$.pipe(
//   mapTo(-1),
//   scan((accumulator, current)=>{
//     return accumulator + current;
//   },COUNTDOWN_FROM),
//   takeWhile( value => value >= 0),
//   takeUntil(abortClick$),
//   startWith(COUNTDOWN_FROM)
// ).subscribe(value => {
//     count.innerHTML = value;
//     if(!value){
//       message.innerHTML = 'Liftoff!';
//     }
//   }
// );

// ------ concat ------
// const interval$ = interval(1000);

// concat(
//   interval$.pipe(take(3)), 
//   interval$.pipe(take(2))
// ).subscribe(console.log);

// ------ Beter niet de concat operator gebruiken , maar de observable create concat 
// const interval$ = interval(1000);
// const delayed$ = empty().pipe(delay(1000));

// delayed$.pipe(
//  concatOp(
//    delayed$.pipe(startWith('3....')),
//    delayed$.pipe(startWith('2....')),
//    delayed$.pipe(startWith('1....')),
//  ),
//  startWith('Get ready!'),
//  endWith('Go!')
// ).subscribe(console.log);

// -------- merge  ------

// const click$ = fromEvent(document, 'click');
// const keyUp$ = fromEvent(document, 'keyup');
//
// // click$.subscribe(console.log);
// // keyUp$.subscribe(console.log);
//
// merge(click$, keyUp$).subscribe(console.log);

//elem
const count = document.getElementById('count');
const start = document.getElementById('start');
const pause = document.getElementById('pause');

const message = document.getElementById('message');
const COUNTDOWN_FROM = 20;

// obs
const startClick$ = fromEvent(start, 'click');
const pauseClick$ = fromEvent(pause, 'click');
const counter$ = interval(1000);

merge(
  startClick$.pipe(mapTo(true)),
  pauseClick$.pipe(mapTo(false))
).pipe(
  switchMap(shouldStart => shouldStart? counter$: empty()),
  mapTo(-1),
  scan((accumulator, current)=>{
    return accumulator + current;
  },COUNTDOWN_FROM),
  takeWhile( value => value >= 0),
  startWith(COUNTDOWN_FROM)
).subscribe(value => {
    count.innerHTML = value;
    if(!value){
      message.innerHTML = 'Liftoff!';
    }
  }
);