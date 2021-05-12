import requestMultipleUrls from '../';

const urls = [
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
];

// Test input values

describe('Invalid URL parameters', () => {
    describe('empty URL parameters', () => {
        test('rejects when no parameter is provided', () => {
            // @ts-expect-error
            return expect(requestMultipleUrls()).rejects.toThrow();
        });

        test('rejects when empty string parameter is provided', () => {
            // @ts-expect-error
            return expect(requestMultipleUrls('')).rejects.toThrow();
        });

        test('rejects when empty array is provided', () => {
            return expect(requestMultipleUrls([])).rejects.toThrow();
        });
    });

    describe('falsey URL parameters', () => {
        const testCases = [null, false, 0];

        testCases.forEach((test) =>
            it(`rejects when (${test}) is provided`, () => {
                // @ts-expect-error
                return expect(requestMultipleUrls(test)).rejects.toThrow();
            }),
        );
    });

    describe('non-array parameter types', () => {
        const testCases = ['string', true, 100];

        testCases.forEach((test) =>
            it(`rejects when (${test}) is provided`, () => {
                // @ts-expect-error
                return expect(requestMultipleUrls(test)).rejects.toThrow();
            }),
        );
    });

    describe('array with an invalid URL', () => {
        const urls = ['https://example.com', 'https:ft-tech-test'];

        test('rejects with an invalid URL in the list', () => {
            return expect(requestMultipleUrls(urls)).rejects.toThrow();
        });
    });
});

describe('Valid URL parameter', () => {
    test('accepts an array of URLs with no errors thrown', () => {
        return expect(requestMultipleUrls(urls)).resolves.not.toThrow();
    });
});

// Test responses
describe('Invalid responses', () => {
    test('error if a URL returns a non-ok HTTP status code (200 - 299)', () => {
        const urls = [
            'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/nikkei.json',
            'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/not-here',
        ];

        return expect(requestMultipleUrls(urls)).rejects.toThrow(Error);
    });

    test('throws an error when response content is not JSON', () => {
        const urls = ['https://example.com'];

        return expect(requestMultipleUrls(urls)).rejects.toThrow(TypeError);
    });
});

describe('Valid responses', () => {
    test('Data in response array should be JSON', () => {
        return requestMultipleUrls(urls).then((response) => {
            expect(JSON.parse(JSON.stringify(response))).toEqual(response);
            expect(response[0]).toHaveProperty('timeGenerated');
            expect(response[0].timeGenerated).toMatch(/2019-11-15/);
        });
    });

    test('Correct inputs should have correct response', () => {
        return requestMultipleUrls(urls).then((response) => {
            expect(response).toBeInstanceOf(Array);
            expect(response).toHaveLength(urls.length);
        });
    });
});
