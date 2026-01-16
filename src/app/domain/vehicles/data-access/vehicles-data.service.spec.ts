import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { beforeEach, describe, expect, it, afterEach } from 'vitest';
import { VehiclesDataService } from './vehicles-data.service';
import { mockVehicles } from './mocks/vehicles';

describe('VehiclesDataService', () => {
  let service: VehiclesDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiclesDataService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(VehiclesDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findVehicles', () => {
    it('should return all vehicles when no filter is provided', () => {
      service.findVehicles({}).subscribe((vehicles) => {
        expect(vehicles).toEqual(mockVehicles);
        expect(vehicles.length).toBe(3);
      });

      const req = httpMock.expectOne('/data/vehicles.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockVehicles);
    });

    it('should filter vehicles by make name', () => {
      service.findVehicles({ makeName: 'Audi' }).subscribe((vehicles) => {
        expect(vehicles.length).toBe(2);
        expect(vehicles.every((v) => v.make === 'Audi')).toBe(true);
      });

      const req = httpMock.expectOne('/data/vehicles.json');
      req.flush(mockVehicles);
    });

    it('should return empty array when no vehicles match filter', () => {
      service.findVehicles({ makeName: 'Tesla' }).subscribe((vehicles) => {
        expect(vehicles.length).toBe(0);
      });

      const req = httpMock.expectOne('/data/vehicles.json');
      req.flush(mockVehicles);
    });

    it('should return all vehicles when filter makeName is empty string', () => {
      service.findVehicles({ makeName: '' }).subscribe((vehicles) => {
        expect(vehicles).toEqual(mockVehicles);
        expect(vehicles.length).toBe(3);
      });

      const req = httpMock.expectOne('/data/vehicles.json');
      req.flush(mockVehicles);
    });
  });

  describe('getManufacturers', () => {
    it('should return unique manufacturers sorted alphabetically', () => {
      service.getManufacturers().subscribe((makes) => {
        expect(makes.length).toBe(2);
        expect(makes[0]).toEqual({ name: 'Audi' });
        expect(makes[1]).toEqual({ name: 'BMW' });
      });

      const req = httpMock.expectOne('/data/vehicles.json');
      req.flush(mockVehicles);
    });

    it('should return empty array when no vehicles exist', () => {
      service.getManufacturers().subscribe((makes) => {
        expect(makes.length).toBe(0);
      });

      const req = httpMock.expectOne('/data/vehicles.json');
      req.flush([]);
    });

    it('should handle single vehicle', () => {
      service.getManufacturers().subscribe((makes) => {
        expect(makes.length).toBe(1);
        expect(makes[0]).toEqual({ name: 'Audi' });
      });

      const req = httpMock.expectOne('/data/vehicles.json');
      req.flush([mockVehicles[0]]);
    });
  });
});
