import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { RequestOptions } from './request-options.service';
import { REQUEST_OPTIONS_DEFAULT } from './types';

@NgModule()
export class RequestOptionsModule {
    static forRoot<T>(options?: T): ModuleWithProviders<RequestOptionsModule> {
        return {
            ngModule: RequestOptionsModule,
            providers: [
                {
                    provide: HttpClient,
                    useClass: HttpService
                },
                {
                    provide: REQUEST_OPTIONS_DEFAULT,
                    useValue: options
                },
                {
                    provide: RequestOptions,
                    useClass: RequestOptions
                }
            ]
        };

    }
}
