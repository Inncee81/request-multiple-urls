import 'ts-polyfill/lib/es2015-promise';
import 'ts-polyfill/lib/es2018-promise';
declare function requestMultipleUrls(urls: string[]): Promise<any[]>;
declare namespace requestMultipleUrls {
    var _a: typeof requestMultipleUrls;
    export { _a as default };
}
export = requestMultipleUrls;
