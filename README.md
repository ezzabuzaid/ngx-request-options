# Request Options
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ezzabuzaid/ngx-request-options/pulls) [![Downloads per month](https://flat.badgen.net/npm/dm/@ezzabuzaid/ngx-request-options)](https://www.npmjs.com/package/@ezzabuzaid/ngx-request-options) [![Version](https://flat.badgen.net/npm/v/@ezzabuzaid/ngx-request-options)](https://www.npmjs.com/package/@ezzabuzaid/ngx-request-options) [![License](https://flat.badgen.net/npm/license/@ezzabuzaid/ngx-request-options)](https://www.npmjs.com/package/@ezzabuzaid/ngx-request-options) 

#### An elegant way to pass custom options to interceptor from http client

In a most of the projects, you'll have default URL for your API's gateway that prefixed before sending the request to the backend to avoid adding it to every time and for some reasons you may have a request that doesn't need the default URL, so in this case, you need a way to not prefixing the URL.

That's just one case, you may also have to not send the Authentication header with a request

That's exactly the purpose of this library, is to pass custom options alongside the request and perform specific logic depend on it.

### installation
`npm install @ezzabuzaid/ngx-request-options`

### Usage
The library was designed to be added without further modification, you'll still use the same `HttpClient` but with one additional augment
the `configure` method that takes the default options before choosing the HTTP method.

First of all you need to create you custom options object

```
interface CustomOptions {
	defaultUrl:boolean;
	defaultAuth: boolean;
}
```
in `app.module` you need to import `RequestOptionsModule` and add it to `imports` list in `NgModule`

```
import { RequestOptionsModule } from  '@ezzabuzaid/ngx-request-options';

@NgModule({
	imports: [
			HttpClientModule,
			RequestOptionsModule.forRoot<CustomOptions>({
				// Default options to be applied on all requests
				defaultAuth: true;
				defaultUrl: true
			})
		]
})

  
// Add those lines as they are to end of the file
declare  module  '@angular/common/http/http' {
	// Augment HttpClient with the added `configure` method
	export  interface  HttpClient {
		/**
		* Configure request options.
		*/
		configure(options: Partial<IRequestOptions>): HttpClient;
	}
}

// Inject the `HttpClient` from `@angular/common/http`
```

## Developer
##### [Ezzabuzaid](mailto:ezzabuzaid@hotmail.com)
- [GitHub](https://github.com/ezzabuzaid)
- [Linkedin](https://www.linkedin.com/in/ezzabuzaid)

## License
##### The MIT License (MIT)

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIyNDEyMTgyMCwtODIxNTE4Mjc1LC0xOT
M2NzAwNzcwXX0=
-->