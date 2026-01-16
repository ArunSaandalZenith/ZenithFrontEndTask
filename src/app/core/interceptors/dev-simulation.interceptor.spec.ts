import { HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { devSimulationInterceptor } from './dev-simulation.interceptor';

describe('devSimulationInterceptor', () => {
  let mockRequest: HttpRequest<unknown>;
  let mockNext: HttpHandlerFn;
  let mockResponse: HttpResponse<unknown>;

  beforeEach(() => {
    mockRequest = new HttpRequest('GET', '/api/test');
    mockResponse = new HttpResponse({ status: 200, body: { data: 'test' } });
    mockNext = vi.fn(() => of(mockResponse));
  });

  it('should add a 2-second delay to the request', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const startTime = Date.now();

    const result$ = TestBed.runInInjectionContext(() =>
      devSimulationInterceptor(mockRequest, mockNext),
    );

    await new Promise<void>((resolve, reject) => {
      result$.subscribe({
        next: () => {
          const elapsedTime = Date.now() - startTime;
          expect(elapsedTime).toBeGreaterThanOrEqual(1900);
          expect(elapsedTime).toBeLessThan(2200);
          resolve();
        },
        error: reject,
      });
    });
  });

  it('should pass through successful responses', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    const result$ = TestBed.runInInjectionContext(() =>
      devSimulationInterceptor(mockRequest, mockNext),
    );

    await new Promise<void>((resolve, reject) => {
      result$.subscribe({
        next: (response) => {
          expect(response).toBe(mockResponse);
          resolve();
        },
        error: reject,
      });
    });
  });

  it('should throw an error when random value is below 0.1', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.05);

    const result$ = TestBed.runInInjectionContext(() =>
      devSimulationInterceptor(mockRequest, mockNext),
    );

    await new Promise<void>((resolve, reject) => {
      result$.subscribe({
        next: () => {
          reject(new Error('Should have thrown an error'));
        },
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
          expect(error.error.message).toBe('Simulated random error for development');
          resolve();
        },
      });
    });
  });

  it('should call next handler with the original request', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    const result$ = TestBed.runInInjectionContext(() =>
      devSimulationInterceptor(mockRequest, mockNext),
    );

    await new Promise<void>((resolve, reject) => {
      result$.subscribe({
        next: () => {
          expect(mockNext).toHaveBeenCalledWith(mockRequest);
          resolve();
        },
        error: reject,
      });
    });
  });

  it('should handle POST requests', async () => {
    const postRequest = new HttpRequest('POST', '/api/test', { data: 'test' });
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const postNext = vi.fn(() => of(mockResponse));

    const result$ = TestBed.runInInjectionContext(() =>
      devSimulationInterceptor(postRequest, postNext),
    );

    await new Promise<void>((resolve, reject) => {
      result$.subscribe({
        next: (response) => {
          expect(response).toBe(mockResponse);
          expect(postNext).toHaveBeenCalledWith(postRequest);
          resolve();
        },
        error: reject,
      });
    });
  });

  it('should work with different response status codes', async () => {
    const customResponse = new HttpResponse({
      status: 201,
      body: { id: 123, name: 'Test' },
    });
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    mockNext = vi.fn(() => of(customResponse));

    const result$ = TestBed.runInInjectionContext(() =>
      devSimulationInterceptor(mockRequest, mockNext),
    );

    await new Promise<void>((resolve, reject) => {
      result$.subscribe({
        next: (response) => {
          expect(response).toBe(customResponse);
          if (response instanceof HttpResponse) {
            expect(response.status).toBe(201);
          }
          resolve();
        },
        error: reject,
      });
    });
  });

  it('should consistently return errors when random is at boundary (0.09)', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.09);

    const result$ = TestBed.runInInjectionContext(() =>
      devSimulationInterceptor(mockRequest, mockNext),
    );

    await new Promise<void>((resolve, reject) => {
      result$.subscribe({
        next: () => {
          reject(new Error('Should have thrown an error'));
        },
        error: (error) => {
          expect(error.status).toBe(500);
          resolve();
        },
      });
    });
  });

  it('should consistently return success when random is at boundary (0.1)', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);

    const result$ = TestBed.runInInjectionContext(() =>
      devSimulationInterceptor(mockRequest, mockNext),
    );

    await new Promise<void>((resolve, reject) => {
      result$.subscribe({
        next: (response) => {
          expect(response).toBe(mockResponse);
          resolve();
        },
        error: reject,
      });
    });
  });
});
