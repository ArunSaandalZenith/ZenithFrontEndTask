import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { VehicleDetails } from './vehicle-details';

describe('VehicleDetails', () => {
  let component: VehicleDetails;
  let fixture: ComponentFixture<VehicleDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
