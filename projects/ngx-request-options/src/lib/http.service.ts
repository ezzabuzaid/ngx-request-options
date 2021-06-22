import { HttpClient, HttpHandler } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { all as merge } from 'deepmerge';
import { RequestOptions } from './request-options.service';
import { Partial, REQUEST_OPTIONS_DEFAULT } from './types';
import { isPlainObject } from 'is-plain-object';

@Injectable()
export class HttpService<T> extends HttpClient {
    private _options = null;
    constructor(
        httpHandler: HttpHandler,
        private requestOptions: RequestOptions<any>,
        @Optional() @Inject(REQUEST_OPTIONS_DEFAULT) private defaultOptions: Partial<any>

    ) {
        super(httpHandler);
    }

    // @ts-ignore
    request(...args: any[]) {
        const url = args[1];
        const options = merge([this.defaultOptions ?? {}, this._options ?? {}], {
            isMergeableObject: isPlainObject
        });
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
