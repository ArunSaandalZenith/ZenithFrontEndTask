import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Vehicle } from '../../data-access/types/vehicle';

@Component({
  selector: 'app-vehicle-card',
  imports: [CurrencyPipe],
  templateUrl: './vehicle-card.html',
  styleUrl: './vehicle-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleCard {
  vehicle = input.required<Vehicle>();
}
