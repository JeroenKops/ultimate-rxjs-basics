import {of, from, interval, fromEvent} from 'rxjs';
import{map,mapTo, pluck, scan, debounceTime,throttleTime, sampleTime, sample, debounce, auditTime,takeUntil, first, take, takeWhile, distinctUntilChanged, distinctUntilKeyChanged} from 'rxjs/operators';
console.clear();

const inputBox = document.getElementById('text-input');

const click$ = fromEvent(document, 'click');
const input$ = fromEvent(inputBox, 'keyup');
 
// input$.pipe(
//   debounce(() => interval(1000)),
//   pluck('target','value'), 
//   distinctUntilChanged()
// ).subscribe(console.log);


// click$.pipe(
//   throttleTime(3000),
// ).subscribe(console.log);

// click$.pipe(
//   auditTime(4000)
// ).subscribe(console.log);

// click$.pipe(
//   sampleTime(4000),
//   map(({clientX, clientY})=>({clientX, clientY}))
// ).subscribe(console.log);


const timer$ = interval(1000);
timer$.pipe(
  sample(click$),
).subscribe(console.log);