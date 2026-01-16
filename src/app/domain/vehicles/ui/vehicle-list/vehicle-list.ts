import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Vehicle } from '../../data-access/types/vehicle';
import { VehicleCard } from '../vehicle-card/vehicle-card';

@Component({
  selector: 'app-vehicle-list',
  imports: [VehicleCard],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleList {
  vehicles = input.required<Vehicle[]>();
}
