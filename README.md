# TimeLodge API starter collection

Connect Postman to your TimeLodge workspace and make your first read. Check that your service token works, then retrieve a page of clients or time entries.

1. Import `TimeLodge.postman_collection.json` into Postman.
2. Create a TimeLodge service token for your workspace with `clients:read` and `time:read`.
3. Set `timelodge_api_token` as a local, sensitive variable in a private Postman environment. Leave its shared value blank.
4. Run **Check connection**. Check that the workspace ID matches your intended workspace, then run **List clients** or **List time entries**.

The collection reads one page at a time. Set `page` and `per_page` as needed, up to 100 records per page. Stop when `meta.current_page` reaches `meta.last_page`. If the API returns 429, wait for the `Retry-After` interval before sending the next request.

A 401 indicates a missing, invalid, expired or revoked token. For a 403, check the token scope and workspace access. To disconnect, revoke the service token in TimeLodge and clear your local variable. See the [TimeLodge API contract](https://timelodge.com/openapi.json) for current request details.
