import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  imports: [],
  template: `<header class="header">
    <img
      src="/branding/logo.svg"
      alt="Zenith Vehicles"
      class="header__logo"
      data-testid="header-logo"
    />
    <span class="header__version" data-testid="header-version">Version {{ version }}</span>
  </header>`,
  styles: `
    :host {
      display: block;
      background-color: blue;
    }

    .header {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
    }

    .header__logo {
      height: 100%;
      width: auto;
      object-fit: contain;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected version = '1.0';
}
