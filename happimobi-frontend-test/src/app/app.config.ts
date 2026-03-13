import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { IconRegistryService } from './core/icons/icon-registry.service';

// Configuração principal da aplicação: roteamento, animações e registro de ícones SVG
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      // Registra todos os ícones SVG antes da aplicação iniciar
      provide: APP_INITIALIZER,
      useFactory: () => {
        const icons = inject(IconRegistryService);
        return () => icons.registerAll();
      },
      multi: true,
    },
  ],
};

