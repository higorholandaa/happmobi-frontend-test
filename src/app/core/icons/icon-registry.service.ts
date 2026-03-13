import { Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { APP_ICONS, AppIconName } from './icons.constants';

const ICONS_BASE = 'assets/icons';

/** Mapa de todos os ícones: nome → arquivo SVG */
const ICON_MAP: Record<AppIconName, string> = {
  'icon-home':          `${ICONS_BASE}/home.svg`,
  'icon-calendar':      `${ICONS_BASE}/agendamentos.svg`,
  'icon-headset':       `${ICONS_BASE}/central.svg`,
  'icon-person':        `${ICONS_BASE}/passengers.svg`,
  'icon-search':        `${ICONS_BASE}/buscar-home.svg`,
  'icon-filter':        `${ICONS_BASE}/icon-filter.svg`,
  'icon-chevron-left':  `${ICONS_BASE}/arrow.svg`,
  'icon-chevron-right': `${ICONS_BASE}/arrow.svg`,
  'icon-qr-code':       `${ICONS_BASE}/scanner.svg`,
  'icon-logo-shield':   `${ICONS_BASE}/icon-logo-shield.svg`,
};

@Injectable({ providedIn: 'root' })
export class IconRegistryService {
  private registry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  /** Chame este método uma vez em app.config.ts via APP_INITIALIZER */
  registerAll(): void {
    for (const [name, path] of Object.entries(ICON_MAP)) {
      this.registry.addSvgIcon(
        name,
        this.sanitizer.bypassSecurityTrustResourceUrl(path),
      );
    }
  }
}
