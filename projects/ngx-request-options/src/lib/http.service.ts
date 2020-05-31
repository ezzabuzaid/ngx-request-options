import { HttpClient, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { RequestOptionsInterceptor } from './request-options.interceptor';
import { ModifiableInterceptor } from './types';

@Injectable()
export class HttpService<T> extends HttpClient {

    constructor(
        httpHandler: HttpHandler,
        private injcetor: Injector,
    ) {
        super(httpHandler);
    }

    get interceptors(): (HttpInterceptor & ModifiableInterceptor)[] {
        return this.injcetor.get(HTTP_INTERCEPTORS) as any;
    }

    configure(options: Partial<T>) {
        const setupInterceptor = this.interceptors.find(({ name }) => name === RequestOptionsInterceptor.name) as RequestOptionsInterceptor;
        setupInterceptor.configure(options);
        return this;
    }

}
