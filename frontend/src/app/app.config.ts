<<<<<<< HEAD
import { ApplicationConfig } from '@angular/core';
=======
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
<<<<<<< HEAD
=======
    provideZoneChangeDetection({ eventCoalescing: true }),
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
<<<<<<< HEAD
};
=======
};
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
