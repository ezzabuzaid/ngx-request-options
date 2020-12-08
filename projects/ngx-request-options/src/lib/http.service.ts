import { HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { RequestOptions } from './request-options.service';
import { ModifiableInterceptor, Partial, REQUEST_OPTIONS_DEFAULT } from './types';
import deepmerge from 'deepmerge';

@Injectable()
export class HttpService<T> extends HttpClient {
    private options = null;
    constructor(
        httpHandler: HttpHandler,
        private injcetor: Injector,
        private requestOptions: RequestOptions<any>,
        @Optional() @Inject(REQUEST_OPTIONS_DEFAULT) private defaultOptions: Partial<any>

    ) {
        super(httpHandler);
    }

    get interceptors(): ModifiableInterceptor[] {
        return this.injcetor.get(HTTP_INTERCEPTORS) as any;
    }

    // @ts-ignore
    request(...args: any[]) {
        const url = args[1];
        const options = deepmerge.all([this.defaultOptions ?? {}, this.options ?? {}]);
        this.requestOptions.set(url, options);
        this.options = null;
        // @ts-ignore
        return super.request(...args);
    }

    // @ts-ignore
    configure(options: Partial<T>) {
        this.options = options;
        return this;
    }

}
