/**
 * Nomes dos ícones SVG registrados via IconRegistryService.
 * Use estes valores no atributo [svgIcon] do <mat-icon>.
 *
 * Exemplo:
 *   <mat-icon svgIcon="icon-home"></mat-icon>
 */
export const APP_ICONS = {
  home:         'icon-home',
  calendar:     'icon-calendar',
  headset:      'icon-headset',
  person:       'icon-person',
  search:       'icon-search',
  filter:       'icon-filter',
  chevronLeft:  'icon-chevron-left',
  chevronRight: 'icon-chevron-right',
  qrCode:       'icon-qr-code',
  logoShield:   'icon-logo-shield',
} as const;

export type AppIconName = (typeof APP_ICONS)[keyof typeof APP_ICONS];
