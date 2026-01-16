import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-layout-footer',
  imports: [DatePipe],
  template: `<footer class="footer" data-testid="footer">
    <span class="footer__copyright" data-testid="footer-copyright">
      &copy; {{ today | date: 'yyyy' }}. A training project from
      <a href="https://www.zenith.co.uk" target="_blank" data-testid="footer-link">Zenith</a>
    </span>
    <address class="footer__address" data-testid="footer-address">
      Number One, Great Exhibition Way, Kirkstall Forge, Leeds, LS5 3BF
    </address>
  </footer>`,
  styles: `
    :host {
      display: block;
      background-color: #eee;
    }

    .footer {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.75rem 1rem;
      gap: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected today: number = Date.now();
}
