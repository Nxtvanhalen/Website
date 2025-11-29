# Implementation Plan - Middleware Security Update

## Goal
Enhance `middleware.ts` to block known malicious IPs, bad user agents, and specific attack paths (e.g., WordPress admin paths) to protect the application from bots and scrapers.

## Proposed Changes

### `middleware.ts`

#### [MODIFY] [middleware.ts](file:///Users/chrisbergstrom/WEBSITE/middleware.ts)
- **Update `BLOCKED_IPS`**: Add new IPs identified in the logs (`208.84.101.102`, `106.196.84.153`, etc.).
- **Update `BLOCKED_USER_AGENTS`**: Add `VertexWP`, `Go-http-client`, `Python/3.10`, `aiohttp`, `httpx`, `python-httpx`, `curl`, `wget`.
- **Add `BLOCKED_PATHS`**: Implement a check for paths like `/wp-admin`, `/xmlrpc.php`, `/.env`, etc.
- **Update `DATA_CENTER_RANGES`**: Ensure the list matches the latest intelligence.
- **Logic Updates**:
    - Add a check for `BLOCKED_PATHS`.
    - Ensure the "Fake Mobile" detector uses the updated ranges.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure type safety and no syntax errors.

### Manual Verification
- **Block IP Test**: I cannot easily spoof IP in a local dev environment without a proxy, but I can verify the logic by temporarily adding my local IP (or a test IP if I can mock headers) to the blocklist, or better, rely on the other checks.
- **Block User Agent Test**:
    - Run `curl -A "VertexWP" http://localhost:3000` -> Should return 403.
    - Run `curl -A "Mozilla/5.0" http://localhost:3000` -> Should return 200.
- **Block Path Test**:
    - Run `curl http://localhost:3000/wp-admin` -> Should return 403.
    - Run `curl http://localhost:3000/.env` -> Should return 403.
- **Fake Mobile Test**:
    - This is harder to test locally without mocking IP headers, but we can verify the code logic via inspection.
