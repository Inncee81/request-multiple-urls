import fetch from 'cross-fetch';
import { URL } from 'url';
import { ValidityObject } from './interfaces/interfaces';
import 'ts-polyfill/lib/es2015-promise';
import 'ts-polyfill/lib/es2018-promise';

function validUrl(url: string) {
    try {
        return !!new URL(url);
    } catch (error) {
        return false;
    }
}

function isJson(contentType: string): boolean {
    return contentType.includes('application/json');
}

function error(message: string, type: string = 'error') {
    const issue = type === 'type' ? new TypeError(message) : new Error(message);

    return issue;
}

function checkResponse(response: Response) {
    const responseStatus: ValidityObject = {
        valid: true,
        message: 'Response valid',
        type: 'success',
    };

    if (!response.ok) {
        responseStatus.valid = false;
        responseStatus.message = `${response.statusText} ${response.status}`;
        responseStatus.type = 'error';
    }

    const contentType = response.headers.get('content-type');

    if (contentType && !isJson(contentType)) {
        responseStatus.valid = false;
        responseStatus.message = 'Invalid response content type. The content returned should be JSON';
        responseStatus.type = 'type';
    }

    return responseStatus;
}

const fetchUrl = (url: string) =>
    fetch(url)
        .then((response) => {
            const { valid, message, type } = checkResponse(response);

            return valid ? response.json() : error(message, type);
        })
        .catch((err) => error(err));

async function retriever(url: string, index: number) {
    const data = validUrl(url)
        ? await fetchUrl(url)
        : error(`The URL in position ${index + 1} is not valid: ${url}`, 'type');

    return data instanceof Error ? Promise.reject(data) : data;
}

function requestMultipleUrls(urls: string[]) {
    const noUrls = typeof urls === 'undefined' || !urls || urls.length === 0;

    if (noUrls) return Promise.reject(error(`No URLs provided`));

    if (!Array.isArray(urls)) return Promise.reject(error('Please provide the URLs as an array', 'type'));

    const results = urls.map(retriever);

    return Promise.all(results);
}

// Allow for interoperability - commonJS and ECM
requestMultipleUrls.default = requestMultipleUrls;
export = requestMultipleUrls;
