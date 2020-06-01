import { InjectionToken } from '@angular/core';

export const REQUEST_OPTIONS_DEFAULT = new InjectionToken<any>('REQUEST_OPTIONS_DEFAULT');

export interface ModifiableInterceptor {
    name: string;
}

export interface IRequestOptionsInterceptor {
    /**
     * Pass the data to setup interceptor in order to pass it along with the request
     */
    configure: (options: any) => void;
}

export type Partial<T> = {
    [P in keyof T]?: T[P];
};
