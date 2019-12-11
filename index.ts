import {of, fromEvent} from 'rxjs';
import{map, first, take, takeWhile} from 'rxjs/operators';
console.clear();

const clicks$ = fromEvent(document, 'click');

clicks$.pipe(
  map(value => {return {x: value.clientX, y: value.clientY}}),
  takeWhile(({x}) => x < 100)
)
.subscribe({
  next:console.log,
  complete: () => console.log('Complete!')
}); 