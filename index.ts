import {of, from, interval, fromEvent} from 'rxjs';
import{map,mapTo, scan, takeUntil, first, take, takeWhile, distinctUntilChanged, distinctUntilKeyChanged} from 'rxjs/operators';
console.clear();

// const clicks$ = fromEvent(document, 'click');

// clicks$.pipe(
//   map(value => {return {x: value.clientX, y: value.clientY}}),
//   takeWhile(({x}) => x < 100)
// )
// .subscribe({
//   next:console.log,
//   complete: () => console.log('Complete!')
// }); 

// const countdown = document.getElementById('countdown');
// const message = document.getElementById('message');

// const abortButton = document.getElementById('abort');
// const counter$ = interval(1000);
// const abort$ = fromEvent(abortButton, 'click');

// counter$
//   .pipe(
//     mapTo(-1),
//     scan((accumulator, current) => {
//       return accumulator + current;
//     }, 10),
//     takeUntil(abort$)
//   )
//   .subscribe((value: any) => {
//     countdown.innerHTML = value;
//     if (!value) {
//       message.innerHTML = 'Liftoff!';
//     }
//   });

// const numbers$ = of(1,1,'1',2,3,3,3,4,5,3);

// numbers$.pipe(
//   distinctUntilChanged()
// ).subscribe(console.log);


const user = [
  { name: 'Brian', loggedIn: false, token: null },
  { name: 'Brian', loggedIn: true, token: 'abc' },
  { name: 'Brian', loggedIn: true, token: '123' }
];

const state$ = from(user).pipe(
  scan((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue };
  }, {})
);

const name$ = state$.pipe(
  
  distinctUntilKeyChanged('name'),
  map((state: any) => state.name),
 
);

name$.subscribe(console.log);

