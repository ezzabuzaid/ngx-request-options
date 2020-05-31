# Request Options
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ezzabuzaid/ngx-request-options/pulls) [![Downloads per month](https://flat.badgen.net/npm/dm/@ezzabuzaid/ngx-request-options)](https://www.npmjs.com/package/@ezzabuzaid/ngx-request-options) [![Version](https://flat.badgen.net/npm/v/@ezzabuzaid/ngx-request-options)](https://www.npmjs.com/package/@ezzabuzaid/ngx-request-options) [![License](https://flat.badgen.net/npm/license/@ezzabuzaid/ngx-request-options)](https://www.npmjs.com/package/@ezzabuzaid/ngx-request-options) 

#### An elegant way to pass custom options to interceptor from http client

In a most of the projects, you'll have default URL for your API's gateway that prefixed before sending the request to the backend to avoid adding it to every time and for some reasons you may have a request that doesn't need the default URL, so in this case, you need a way to not prefixing the URL.

That's just one case, you may also have to not send the Authentication header with a request

That's exactly the purpose of this library, is to pass custom options alongside the request and perform specific logic depend on it.

### installation
`npm install @ezzabuzaid/ngx-request-options`

### Usage
First of all you need to create you custom options object

ex.
```
interface CustomOptions {
	defaultUrl:boolean;
	defaultAuth: boolean;
}
```
in app.module you need to import `RequestOptionsModule`

````
import { RequestOptionsModule } from  '@ezzabuzaid/ngx-request-options';

RequestOptionsModule.forRoot<CustomOptions>({
	defaultAuth: true;
	defaultUrl: true
}),


## Developer
##### [Ezzabuzaid](mailto:ezzabuzaid@hotmail.com)
- [GitHub](https://github.com/ezzabuzaid)
- [Linkedin](https://www.linkedin.com/in/ezzabuzaid)

## License
##### The MIT License (MIT)

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTMxMjk5NDA5MCwtMTkzNjcwMDc3MF19
-->