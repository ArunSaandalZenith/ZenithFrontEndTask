import { HttpInterceptorFn } from '@angular/common/http';
import { delay, of, mergeMap, throwError } from 'rxjs';

/**
 * Development interceptor that simulates:
 * - Network delay (2 seconds)
 * - Random errors (10% chance)
 *
 * To disable, remove from app.config.ts providers
 */
export const devSimulationInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    delay(2000),
    mergeMap((response) => {
      if (Math.random() < 0.1) {
        return throwError(() => ({
          status: 500,
          statusText: 'Internal Server Error',
          error: { message: 'Simulated random error for development' },
        }));
      }
      return of(response);
    }),
  );
};
