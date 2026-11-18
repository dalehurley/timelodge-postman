import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const file = new URL('../TimeLodge.postman_collection.json', import.meta.url);
const collection = JSON.parse(
    readFileSync(process.argv.includes('--stdin') ? 0 : file, 'utf8'),
);
const endpoints = ['/api/v1/ping', '/api/v1/clients', '/api/v1/time-entries'];

assert.equal(collection.auth.type, 'bearer');
assert.deepEqual(collection.auth.bearer, [
    { key: 'token', value: '{{timelodge_api_token}}', type: 'string' },
]);
assert.equal(collection.variable, undefined);
assert.deepEqual(
    collection.item.map((item) => new URL(item.request.url.raw).pathname),
    endpoints,
);
assert.equal(
    new Set(collection.item.map((item) => item.id)).size,
    endpoints.length,
);

for (const item of collection.item) {
    const url = new URL(item.request.url.raw);
    assert.equal(url.origin, 'https://timelodge.com');
    assert.equal(item.request.method, 'GET');
    assert.equal(item.request.auth, undefined);
    assert.deepEqual(item.request.header, [
        { key: 'Accept', value: 'application/json' },
    ]);
    assert.equal(item.protocolProfileBehavior.followRedirects, false);
    assert.deepEqual(item.response, []);
    if (url.pathname === '/api/v1/ping') {
        assert.equal(url.search, '');
    } else {
        assert.equal(url.search, '?page=1&per_page=25');
        assert.equal(
            new URLSearchParams(
                item.request.url.query.map(({ key, value }) => [key, value]),
            ).toString(),
            url.search.slice(1),
        );
    }
}
