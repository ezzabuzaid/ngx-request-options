import { HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { RequestOptions } from './request-options.service';
import { ModifiableInterceptor, Partial, REQUEST_OPTIONS_DEFAULT } from './types';
import { all as merge } from 'deepmerge';

@Injectable()
export class HttpService<T> extends HttpClient {
    private _options = null;
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
        const options = merge([this.defaultOptions ?? {}, this._options ?? {}]);
        this.requestOptions.set(url, options);
        this._options = null;
        // @ts-ignore
        return super.request(...args);
    }

    // @ts-ignore
    configure(options: Partial<T>) {
        this._options = options;
        return this;
    }

}
