import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RequestOptions } from './request-options.service';
import { IRequestOptionsInterceptor, ModifiableInterceptor, REQUEST_OPTIONS_DEFAULT } from './types';

@Injectable()
export class RequestOptionsInterceptor implements IRequestOptionsInterceptor, ModifiableInterceptor {
    public name = RequestOptionsInterceptor.name;
    private optionsForNextRequest: Partial<any> = {};

    constructor(
        private requestData: RequestOptions<any>,
        @Optional() @Inject(REQUEST_OPTIONS_DEFAULT) private defaultOptions: Partial<any>
    ) {
        this.optionsForNextRequest = this.defaultOptions;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requestData.set(request, this.optionsForNextRequest);
        this.configure(this.defaultOptions);

        return next.handle(request)
            .pipe(finalize(() => {
                this.requestData.delete(request);
            }));
    }

    configure(options: Partial<any>) {
        this.optionsForNextRequest = {
            ...this.defaultOptions,
            ...options
        };
    }

}
