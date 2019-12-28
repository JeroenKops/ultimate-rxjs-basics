console.clear();

import {of, fromEvent, interval} from 'rxjs';
import { delay, map,  mergeMap,concatMap, switchMap, exhaustMap, takeUntil,take,debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';
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

// const BASE_URL = 'https://api.openbrewerydb.org/breweries';

// const inputBox = document.getElementById('text-input');

// const typeaheadContainer = document.getElementById('typeahead-container');

// const input$ = fromEvent(inputBox,'keyup');

// input$.pipe(
//   //debounceTime(500),
//   pluck('target','value'),
//   distinctUntilChanged(),
//   switchMap(searchTerm =>{return ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}`)})
// ).subscribe(response => { 
//     //update ui
//     typeaheadContainer.innerHTML = response.map(b => b.name).join('<br/>')
//   }
// );

// ------ CONCAT MAP ------

// click$.pipe(
//   concatMap(()=> interval$.pipe(
//     take(3)
//   )), 
// ).subscribe(console.log);

// const saveAnswer = answer => {
//   return of(`Saved: ${answer}`).pipe(
//     delay(1500)
//   );
// };

// const radioButtons = document.querySelectorAll('.radio-option');

// const answerChange$ = fromEvent(radioButtons, 'click');

// answerChange$.pipe(
//   concatMap(event => saveAnswer(event.target.value))
// ).subscribe(console.log);

// ------ EXHAUST MAP ------

// click$.pipe(
//   exhaustMap(()=> interval$.pipe(
//     take(3)
//   ))
// ).subscribe(console.log);

const REGRES_IN_LOGIN = 'https://regres.in/api/login';

const login = () =>{
  return ajax.post(REGRES_IN_LOGIN, {email:'eve.holt@reqres.in',password:'cityslicka'});
}

const loginButton = document.getElementById('login');

console.log(loginButton);

const login$ = fromEvent(loginButton, 'click');

login$.pipe(
  exhaustMap(()=> login())
).subscribe(console.log);

// login$.subscribe(console.log('clicked'));