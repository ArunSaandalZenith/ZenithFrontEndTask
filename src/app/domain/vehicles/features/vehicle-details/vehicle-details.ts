import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-vehicle-details',
  imports: [],
  templateUrl: './vehicle-details.html',
  styleUrl: './vehicle-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleDetails {}
