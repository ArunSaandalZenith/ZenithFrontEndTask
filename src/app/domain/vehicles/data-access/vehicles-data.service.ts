import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Vehicle } from './types/vehicle';
import { VehicleFilter } from './types/vehicles-filter';
import { Make } from './types/make';

const dataFile = '/data/vehicles.json';

@Injectable({
  providedIn: 'root',
})
export class VehiclesDataService {
  #http = inject(HttpClient);

  findVehicles(filter: VehicleFilter): Observable<Vehicle[]> {
    return this.#http
      .get<Vehicle[]>(dataFile)
      .pipe(
        map((vehicles) =>
          vehicles.filter((vehicle) => (filter.makeName ? vehicle.make === filter.makeName : true)),
        ),
      );
  }

  getManufacturers(): Observable<Make[]> {
    return this.#http.get<Vehicle[]>(dataFile).pipe(
      map((vehicles) => {
        const makesSet = new Set<string>();
        vehicles.forEach((vehicle) => makesSet.add(vehicle.make));
        const makesArray: Make[] = Array.from(makesSet).map((makeName) => ({ name: makeName }));
        makesArray.sort((a, b) => a.name.localeCompare(b.name));
        return makesArray;
      }),
    );
  }
}
