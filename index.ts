console.clear();

import {fromEvent, interval} from 'rxjs';
import { map,  mergeMap,switchMap, takeUntil,debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

const click$ = fromEvent(document, 'click');
const mouseDown$ = fromEvent(document, 'mousedown');
const mouseUp$ = fromEvent(document, 'mouseup');
const interval$ = interval(1000);

//----- MERGE MAP -----

// click$.pipe(
//  mergeMap(()=> interval$)
// ).subscribe(console.log);

// mouseDown$.pipe(
//   mergeMap(()=> interval$.pipe(
//     takeUntil(mouseUp$)
//   ))
// ).subscribe(console.log);

// const coordinates$ = click$.pipe(
//   map(({clientX,clientY})=> ({x: clientX,y: clientY}))
// );

// const coordinatesWithSave = coordinates$.pipe(
//   mergeMap(coords => ajax.post('https://www.mocky.io/v2/5185415ba171ea3a00704eed', coords) )
// ).subscribe(console.log);


// ------ SWITCH MAP ------
// click$.pipe(
//  switchMap(()=> interval$)
// ).subscribe(console.log);

const BASE_URL = 'https://api.openbrewerydb.org/breweries';

const inputBox = document.getElementById('text-input');
const input$ = fromEvent(inputBox,'keyup');

input$.pipe(
  //debounceTime(500),
  pluck('target','value'),
  distinctUntilChanged(),
  switchMap(searchTerm =>{return ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}`)})
).subscribe(console.log);