console.clear();

import {of,empty, interval, fromEvent, concat, merge, combineLatest,forkJoin} from 'rxjs'
import {startWith, endWith,mapTo,scan,tap, takeUntil, takeWhile, take,delay, concat as concatOp, switchMap, map, filter, withLatestFrom,catchError} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

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
// const count = document.getElementById('count');
// const start = document.getElementById('start');
// const pause = document.getElementById('pause');

// const message = document.getElementById('message');
// const COUNTDOWN_FROM = 20;

// // obs
// const startClick$ = fromEvent(start, 'click');
// const pauseClick$ = fromEvent(pause, 'click');
// const counter$ = interval(1000);

// merge(
//   startClick$.pipe(mapTo(true)),
//   pauseClick$.pipe(mapTo(false))
// ).pipe(
//   switchMap(shouldStart => shouldStart? counter$: empty()),
//   mapTo(-1),
//   scan((accumulator, current)=>{
//     return accumulator + current;
//   },COUNTDOWN_FROM),
//   takeWhile( value => value >= 0),
//   startWith(COUNTDOWN_FROM)
// ).subscribe(value => {
//     count.innerHTML = value;
//     if(!value){
//       message.innerHTML = 'Liftoff!';
//     }
//   }
// );


// ------ combine latest

// const click$ = fromEvent(document, 'click');
// const keyUp$ = fromEvent(document, 'keyup');
//
// combineLatest(click$, keyUp$).subscribe(console.log);

//elem
// const first = document.getElementById('first');
// const second = document.getElementById('second');
//
// const keyupAsValue = elem =>{
//   return fromEvent(elem, 'keyup').pipe(
//     map((event:any)=> event.target.valueAsNumber)
//   )
// }
// combineLatest(
//   keyupAsValue(first),
//   keyupAsValue(second)
// ).pipe(
//   filter(([first,second])=> {return !isNaN(first) && !isNaN(second)}),
//   map(([first,second])=> first + second)
// ).subscribe(console.log);


// ------ withLatestFrom ----
// const click$ = fromEvent(document, 'click');
// const interval$ = interval(1000);
//
// click$.pipe(
//   withLatestFrom(interval$)
// ).subscribe(console.log);

// ------- forkJoin ------
// const number$ = of(1,2,3);
// const letter$ = of('x','y','z');

// forkJoin({
//  number: number$,
//  letter: letter$.pipe(delay(3000))
// }
// ).subscribe(console.log);


const GITHUB_API = 'https://api.github.com';

forkJoin({
  user: ajax.getJSON(`${GITHUB_API}/users/JeroenKops`),
  repo: ajax.getJSON(`${GITHUB_API}/users/JeroenKops/repos`).pipe(
    catchError(error =>{
      console.log(error);
      return empty();
    })
  )
}).subscribe(console.log);