console.clear();

import {interval,pipe} from 'rxjs';
import {scan, filter, mapTo, tap} from'rxjs/operators';

const messageDiv = document.getElementById('message');
const countDiv = document.getElementById('count');

interval(1000).pipe(
  mapTo(-1),
  scan((accumulator, current)=>{
return  accumulator + current;
  },10),
  tap(console.log),
  filter(value => value >= 0)
).subscribe( value => {
  countDiv.innerHTML = value;
  if(!value){
    messageDiv.innerHTML = 'ready for takeOff!';
  }
});