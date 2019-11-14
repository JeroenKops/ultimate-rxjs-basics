console.clear();
import { Observable } from "rxjs";

const observer = {
  next: value => console.log("next", value),
  error: error => console.log("error", error),
  complete: () => console.log("complete")
};
const observable = new Observable(subscriber => {
  subscriber.next("Hello");
  subscriber.next("World");
  subscriber.next("World");
  subscriber.next("Hello");
  subscriber.complete();
  subscriber.next("Hello");
});

observable.subscribe(observer);
