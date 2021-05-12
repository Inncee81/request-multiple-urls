"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var cross_fetch_1 = require("cross-fetch");
var url_1 = require("url");
require("ts-polyfill/lib/es2015-promise");
require("ts-polyfill/lib/es2018-promise");
function validUrl(url) {
    try {
        return !!new url_1.URL(url);
    }
    catch (error) {
        return false;
    }
}
function isJson(contentType) {
    return contentType.includes('application/json');
}
function error(message, type) {
    if (type === void 0) { type = 'error'; }
    var issue = type === 'type' ? new TypeError(message) : new Error(message);
    return issue;
}
function checkResponse(response) {
    var responseStatus = {
        valid: true,
        message: 'Response valid',
        type: 'success',
    };
    if (!response.ok) {
        responseStatus.valid = false;
        responseStatus.message = response.statusText + " " + response.status;
        responseStatus.type = 'error';
    }
    var contentType = response.headers.get('content-type');
    if (contentType && !isJson(contentType)) {
        responseStatus.valid = false;
        responseStatus.message = 'Invalid response content type. The content returned should be JSON';
        responseStatus.type = 'type';
    }
    return responseStatus;
}
var fetchUrl = function (url) {
    return cross_fetch_1.default(url)
        .then(function (response) {
        var _a = checkResponse(response), valid = _a.valid, message = _a.message, type = _a.type;
        return valid ? response.json() : error(message, type);
    })
        .catch(function (err) { return error(err); });
};
function retriever(url, index) {
    return __awaiter(this, void 0, void 0, function () {
        var data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!validUrl(url)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchUrl(url)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = error("The URL in position " + (index + 1) + " is not valid: " + url, 'type');
                    _b.label = 3;
                case 3:
                    data = _a;
                    return [2 /*return*/, data instanceof Error ? Promise.reject(data) : data];
            }
        });
    });
}
function requestMultipleUrls(urls) {
    var noUrls = typeof urls === 'undefined' || !urls || urls.length === 0;
    if (noUrls)
        return Promise.reject(error("No URLs provided"));
    if (!Array.isArray(urls))
        return Promise.reject(error('Please provide the URLs as an array', 'type'));
    var results = urls.map(retriever);
    return Promise.all(results);
}
// Allow for interoperability - commonJS and ECM
requestMultipleUrls.default = requestMultipleUrls;
module.exports = requestMultipleUrls;
