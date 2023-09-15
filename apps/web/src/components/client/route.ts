import { ReplaySubject } from "rxjs";

export default new ReplaySubject<string[]>(1);
