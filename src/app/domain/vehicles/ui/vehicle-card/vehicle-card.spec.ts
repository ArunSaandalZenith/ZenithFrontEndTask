import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { VehicleCard } from './vehicle-card';
import { Vehicle } from '../../data-access/types/vehicle';
import { mockVehicles } from '../../data-access/mocks/vehicles';

describe('VehicleCard', () => {
  let component: VehicleCard;
  let fixture: ComponentFixture<VehicleCard>;

  const mockVehicle: Vehicle = mockVehicles[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCard],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('vehicle', mockVehicle);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct input property', () => {
    expect(component.vehicle()).toEqual(mockVehicle);
  });

  it('should render vehicle image with correct src and alt', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('[data-testid="vehicle-image"]');
    expect(img?.getAttribute('src')).toBe('/cars/audi-a4.jpg');
    expect(img?.getAttribute('alt')).toBe('A4');
  });

  it('should render vehicle title with make and model', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('[data-testid="vehicle-title"]');
    expect(title?.textContent?.trim()).toBe('Audi A4');
  });

  it('should render monthly cost with GBP currency', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const description = compiled.querySelector('[data-testid="vehicle-description"]');
    expect(description?.textContent).toContain('£350');
    expect(description?.textContent).toContain('/monthly net cost');
  });

  it('should render all tags', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tags = compiled.querySelectorAll('[data-testid="vehicle-tag"]');
    expect(tags.length).toBe(2);
    expect(tags[0]?.textContent?.trim()).toBe('sedan');
    expect(tags[1]?.textContent?.trim()).toBe('luxury');
  });

  it('should render no tags when tags array is empty', () => {
    const vehicleWithoutTags: Vehicle = {
      ...mockVehicle,
      tags: [],
    };
    fixture.componentRef.setInput('vehicle', vehicleWithoutTags);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tags = compiled.querySelectorAll('[data-testid="vehicle-tag"]');
    expect(tags.length).toBe(0);
  });
});
