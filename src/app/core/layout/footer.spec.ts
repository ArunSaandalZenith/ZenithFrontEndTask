import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer', () => {
    expect(component).toBeTruthy();
  });

  it('should render current year', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('[data-testid="footer"]');
    const currentYear = new Date().getFullYear().toString();
    expect(footer?.textContent).toContain(currentYear);
  });

  it('should render Zenith link correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('[data-testid="footer-link"]');
    expect(link?.textContent?.trim()).toBe('Zenith');
    expect(link?.getAttribute('href')).toBe('https://www.zenith.co.uk');
    expect(link?.getAttribute('target')).toBe('_blank');
  });

  it('should render complete address', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const address = compiled.querySelector('[data-testid="footer-address"]');
    expect(address?.textContent?.trim()).toBe(
      'Number One, Great Exhibition Way, Kirkstall Forge, Leeds, LS5 3BF',
    );
  });
});
