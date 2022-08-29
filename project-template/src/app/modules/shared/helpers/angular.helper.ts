import { isObservable, Subscription } from 'rxjs';
import { logError } from './log.helper';

export const executeAndCatch = <T, E>(executor: Promise<T> | Observable<T>, onError?: (error: E) => void) => {
    if (isObservable(executor)) {
        return executor.subscribe(null, e => {
            logError('Error executing request', e);
            if (onError) {
                onError(e);
            }
        });
    } else if (executor instanceof Promise) {
        executor.then(null, error => logError(error));
    }
    return Subscription.EMPTY;
};
