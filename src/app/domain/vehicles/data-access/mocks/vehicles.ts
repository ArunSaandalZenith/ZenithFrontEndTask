import { Vehicle } from '../types/vehicle';

export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    make: 'Audi',
    model: 'A4',
    tags: ['sedan', 'luxury'],
    monthlyNetCost: 350,
    imageUrl: '/cars/audi-a4.jpg',
  },
  {
    id: 2,
    make: 'BMW',
    model: 'X5',
    tags: ['suv', 'luxury'],
    monthlyNetCost: 550,
    imageUrl: '/cars/bmw-x5.jpg',
  },
  {
    id: 3,
    make: 'Audi',
    model: 'Q7',
    tags: ['suv', 'luxury'],
    monthlyNetCost: 450,
    imageUrl: '/cars/audi-q7.jpg',
  },
];
