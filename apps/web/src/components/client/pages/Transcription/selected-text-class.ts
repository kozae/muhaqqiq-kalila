import { BehaviorSubject } from "rxjs";

export const selectedTextClass = new BehaviorSubject<"Body" | string>("Body");
