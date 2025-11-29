import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. THE BLACKLIST: Known Bad IPs (The ones from your logs)
const BLOCKED_IPS = [
    '45.148.10.205',  // The "Env File" Hacker
    '43.131.26.226',  // Tencent Cloud "Fake iPhone"
    '43.156.156.96',  // Tencent Cloud "Fake iPhone"
    '170.106.35.187', // Spam Data Center
    '135.181.4.161',  // The Aggressive WordPress Bot
];

// 2. THE BAD AGENTS: Bots that identified themselves
const BLOCKED_USER_AGENTS = [
    'VertexWP',          // The WordPress Scanner
    'Go-http-client',    // Generic Script
    'Python/3.10',       // Generic Script
    'aiohttp',           // Generic Script
];

// 3. KNOWN CLOUD SUBNETS (To catch "Fake iPhones")
// These are broad ranges for Tencent/AWS/Azure.
// Real iPhones NEVER come from these IPs.
const DATA_CENTER_RANGES = [
    '43.131.', '43.156.', // Tencent Cloud
    '170.106.',           // Known Spam Subnets
    '45.148.',            // The subnet of your main attacker
];

export function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    // --- CHECK 1: Explicit IP Blocks ---
    // If the IP matches our blacklist exactly
    if (BLOCKED_IPS.includes(ip)) {
        console.log(`[BLOCKED] Known Bad IP: ${ip}`);
        return new NextResponse(JSON.stringify({ error: 'Access Denied' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // --- CHECK 2: Bad User Agents ---
    // If they admit they are a bot we don't like
    if (BLOCKED_USER_AGENTS.some(ua => userAgent.includes(ua))) {
        console.log(`[BLOCKED] Bad User Agent: ${userAgent} from ${ip}`);
        return new NextResponse(JSON.stringify({ error: 'Bot Detected' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // --- CHECK 3: The "Fake iPhone" Detector ---
    // Logic: If you claim to be an "iPhone" but you are calling from a Data Center... you are a liar.
    const isClaimingToBeMobile = userAgent.includes('iPhone') || userAgent.includes('Android');
    const isFromDataCenter = DATA_CENTER_RANGES.some(range => ip.startsWith(range));

    if (isClaimingToBeMobile && isFromDataCenter) {
        console.log(`[BLOCKED] Fake Mobile Device Detected: ${ip} claiming ${userAgent}`);
        return new NextResponse(JSON.stringify({ error: 'VPN/Proxy Detected' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // If clean, let them pass!
    return NextResponse.next();
}

// Configure which paths this runs on
export const config = {
    matcher: [
        // Apply to everything EXCEPT static files (images, fonts) to save performance
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
