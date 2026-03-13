/**
 * Módulo centralizado de assets da aplicação.
 *
 * Como usar:
 *   import { APP_ASSETS } from '@core/constants/assets.constants';
 *
 *   // no componente:
 *   logoSrc = APP_ASSETS.ui.logo;
 *   carSrc  = APP_ASSETS.cars.miniCooper;
 *
 * Para adicionar uma imagem nova:
 *   1. Coloque o arquivo em src/assets/images/<pasta>/
 *   2. Declare o caminho aqui no objeto correspondente.
 */

const BASE = 'assets/images';

export const APP_ASSETS = {
  ui: {
    logo:            `${BASE}/ui/logo.png`,
    logoShield:      `${BASE}/ui/logo-shield.svg`,
    heroBanner:      `${BASE}/ui/hero-banner.png`,
    avatarDefault:   `${BASE}/ui/avatar-default.png`,
  },

  cars: {
    miniCooper:  `${BASE}/cars/mini-cooper.png`,
    fordKa:      `${BASE}/cars/ford-ka.png`,
    duster:      `${BASE}/cars/duster.png`,
    jeepCompass: `${BASE}/cars/jeep-compass.png`,
    toro:        `${BASE}/cars/toro.png`,
    tCross:      `${BASE}/cars/t-cross.png`,
    strada:      `${BASE}/cars/strada.png`,
    saveiro:     `${BASE}/cars/saveiro.png`,
    versa:       `${BASE}/cars/versa.png`,
    jetta:       `${BASE}/cars/jetta.png`,
    doblo:       `${BASE}/cars/doblo.png`,
    fiorino:     `${BASE}/cars/fiorino.png`,
    partner:     `${BASE}/cars/partner.png`,
  },
} as const;

export type CarAssetKey = keyof typeof APP_ASSETS.cars;
