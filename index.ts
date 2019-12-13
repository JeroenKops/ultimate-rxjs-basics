import {of, from, interval, fromEvent} from 'rxjs';
import{map,mapTo, pluck, scan, debounceTime, debounce, takeUntil, first, take, takeWhile, distinctUntilChanged, distinctUntilKeyChanged} from 'rxjs/operators';
console.clear();

const inputBox = document.getElementById('text-input');

const click$ = fromEvent(document, 'click');
const input$ = fromEvent(inputBox, 'keyup');
 
input$.pipe(
  debounce(() => interval(1000)),
  pluck('target','value'), 
  distinctUntilChanged()
).subscribe(console.log);


