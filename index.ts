import {of, fromEvent} from 'rxjs';
import{map, first, take} from 'rxjs/operators';


const clicks$ = fromEvent(document, 'click');

clicks$.pipe(
  map(value => {return {x: value.clientX, y: value.clientY}}),
  first(({x}) => x < 100)
)
.subscribe({
  next:console.log,
  complete: () => console.log('Complete!')
});