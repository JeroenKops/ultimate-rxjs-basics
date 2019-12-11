import {of, interval, fromEvent} from 'rxjs';
import{map,mapTo, scan, takeUntil, first, take, takeWhile} from 'rxjs/operators';
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

const countdown = document.getElementById('countdown');
const message = document.getElementById('message');

const abortButton = document.getElementById('abort');
const counter$ = interval(1000);
const abort$ = fromEvent(abortButton, 'click');

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 10),
    takeUntil(abort$)
  )
  .subscribe((value: any) => {
    countdown.innerHTML = value;
    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });
