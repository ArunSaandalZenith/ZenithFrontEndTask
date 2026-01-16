import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo with correct src and alt', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('[data-testid="header-logo"]');
    expect(logo?.getAttribute('src')).toBe('/branding/logo.svg');
    expect(logo?.getAttribute('alt')).toBe('Zenith Vehicles');
  });

  it('should render version text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const versionSpan = compiled.querySelector('[data-testid="header-version"]');
    expect(versionSpan?.textContent?.trim()).toBe('Version 1.0');
  });
});
