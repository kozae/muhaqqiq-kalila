import { Subject } from "rxjs";


export type AlertType = 'success' | 'danger' | 'warning' | 'info';

export const alertSubject = new Subject<{ message: string, type: AlertType }>();

