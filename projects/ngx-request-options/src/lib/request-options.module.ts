import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpService, } from './http.service';
import { RequestOptionsInterceptor } from './request-options.interceptor';
import { REQUEST_OPTIONS_DEFAULT } from './types';
import { RequestOptions } from './request-options.service';

@NgModule()
export class RequestOptionsModule {
    static forRoot<T>(options?: T): ModuleWithProviders {
        return {
            ngModule: RequestOptionsModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RequestOptionsInterceptor,
                    multi: true
                },
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
