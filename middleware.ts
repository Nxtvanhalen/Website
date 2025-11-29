import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. THE BLACKLIST: Known Bad IPs
// Updated to include the new "Cloud Hunter" (99.79.71.152)
const BLOCKED_IPS = [
    '45.148.10.205',  // The "Env File" Hacker (Original Attacker)
    '99.79.71.152',   // The "Cloud Hunter" (OVH/Canada - python-httpx)
    '43.131.26.226',  // Tencent Cloud "Fake iPhone"
    '43.156.156.96',  // Tencent Cloud "Fake iPhone"
    '170.106.35.187', // Spam Data Center
    '135.181.4.161',  // The Aggressive WordPress Bot
    '193.233.203.251', // Russian Data Center Scraper
];

// 2. THE BAD AGENTS: Bots that identified themselves
const BLOCKED_USER_AGENTS = [
    'VertexWP',          // The WordPress Scanner
    'Go-http-client',    // Generic Script
    'Python/3.10',       // Generic Script
    'aiohttp',           // Generic Script
    'httpx',             // <--- NEW: The library used by the Cloud Hunter
    'python-httpx',      // <--- NEW: Explicitly naming the Python version
    'curl',              // Block raw curl requests
    'wget',              // Block raw wget requests
];

// 3. KNOWN CLOUD SUBNETS (To catch "Fake iPhones")
// Real mobile users do NOT come from these ranges.
const DATA_CENTER_RANGES = [
    '43.131.', '43.156.', // Tencent Cloud
    '170.106.',           // Known Spam Subnets
    '45.148.',            // The subnet of your main attacker
    '99.79.',             // OVH Cloud (New attacker subnet)
];

export function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    // --- CHECK 1: Explicit IP Blocks ---
    // Immediate rejection for known bad actors
    if (BLOCKED_IPS.includes(ip)) {
        console.log(`[BLOCKED] Known Bad IP: ${ip}`);
        return new NextResponse(JSON.stringify({ error: 'Access Denied' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // --- CHECK 2: Bad User Agents ---
    // Block scripts that identify themselves as tools
    if (BLOCKED_USER_AGENTS.some(ua => userAgent.includes(ua))) {
        console.log(`[BLOCKED] Bad User Agent: ${userAgent} from ${ip}`);
        return new NextResponse(JSON.stringify({ error: 'Bot Detected' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // --- CHECK 3: The "Fake Mobile" Detector ---
    // Logic: If you claim to be mobile but come from a Data Center, you are a scraper.
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
        // Run on everything EXCEPT static assets (images, fonts, favicon)
        // This reduces server load significantly.
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
