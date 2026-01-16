import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { VehicleList } from './vehicle-list';
import { mockVehicles } from '../../data-access/mocks/vehicles';

describe('VehicleList', () => {
  let component: VehicleList;
  let fixture: ComponentFixture<VehicleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleList],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('vehicles', mockVehicles);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct input property', () => {
    expect(component.vehicles()).toEqual(mockVehicles);
  });

  it('should render all vehicle cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const vehicleCards = compiled.querySelectorAll('app-vehicle-card');
    expect(vehicleCards.length).toBe(3);
  });

  it('should pass correct vehicle data to each card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstCardTitle = compiled.querySelector('[data-testid="vehicle-title"]');
    expect(firstCardTitle?.textContent?.trim()).toBe('Audi A4');
  });

  it('should render empty list when no vehicles provided', () => {
    fixture.componentRef.setInput('vehicles', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const vehicleCards = compiled.querySelectorAll('app-vehicle-card');
    expect(vehicleCards.length).toBe(0);
  });

  it('should render correct number of vehicles when list changes', () => {
    fixture.componentRef.setInput('vehicles', [mockVehicles[0]]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const vehicleCards = compiled.querySelectorAll('app-vehicle-card');
    expect(vehicleCards.length).toBe(1);
  });
});
