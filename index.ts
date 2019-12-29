console.clear();

import {of, fromEvent, combineLatest} from 'rxjs';
import {map,delay,mergeMap, filter, tap, share} from 'rxjs/operators';

// elem
const amount = document.getElementById('amount');
const interest = document.getElementById('percentage');
const years = document.querySelectorAll('.loanlength');
const montly = document.getElementById('montly');
//helper
const createInputValueStream = elem =>{ 
  return fromEvent(elem, 'input').pipe(
    map((event:any) => parseFloat(event.target.value))
  );
}

const saveResponse = mortgageAmount=> {
  return of(mortgageAmount).pipe(
    delay(1000)
    );
}
//streams
const loanamount$ = createInputValueStream(amount);
const interest$ = createInputValueStream(interest);
const loanlength$ = createInputValueStream(years);

const calculation$ = combineLatest(
  loanamount$,
  interest$,
  loanlength$
 ).pipe(
   map(([amount, interest, length])=> calculateMontlyPaymentAmount(interest, amount, length)),
   tap(console.log),
   filter(mortgageAmount => !isNaN(mortgageAmount)),
   share()
 );
 
 calculation$.subscribe(value => montly.innerHTML = value);

calculation$.pipe(mergeMap(mortgageAmount => saveResponse(mortgageAmount))).subscribe();


function calculateMontlyPaymentAmount(interest, loanamount, loanlength){
  const calculatedInterest = interest/100;
  const total = loanamount * calculatedInterest / ( 1 - (Math.pow(1/(1+calculatedInterest), loanlength)));
  return total.toFixed(2);
}



