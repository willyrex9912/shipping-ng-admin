import {
  provideTransloco,
  TranslocoModule
} from '@ngneat/transloco';
import {isDevMode, NgModule} from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';
//import { environment } from '../../home/rex/usac/shipping/shipping-ng-admin/src/app/app-commons/components/src/environments/environment';

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
      provideTransloco({
        config: {
          availableLangs: ['en', 'es'],
          defaultLang: 'es',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
  ],
})
export class TranslocoRootModule {}
