import {fromEvent, timer} from 'rxjs'
import {ajax} from 'rxjs/ajax'
import {pluck, mergeMapTo, exhaustMap, takeUntil, tap, finalize} from 'rxjs/operators'


//elem
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const status = document.getElementById('status');
const dogImg = document.getElementById('dog-img');
//obs
const startClick$ = fromEvent(startButton,'click');
const stopClick$ = fromEvent(stopButton, 'click');

startClick$.pipe(
  mergeMapTo(
    timer(0,5000).pipe(
      tap(() => status.innerHTML = 'Active'),
      exhaustMap(()=>{ return ajax.getJSON('https://random.dog/woof.json').pipe(
          pluck('url')
      )}),
      takeUntil(stopClick$), 
      finalize(()=> status.innerHTML = 'Stopped')
    )
  )
).subscribe(url => dogImg.src = url);