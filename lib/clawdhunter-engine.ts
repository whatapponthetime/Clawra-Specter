import { load } from 'cheerio';

// Environment variables for LLM
const LLM_API_KEY = process.env.LLM_API_KEY;
const LLM_API_URL = process.env.LLM_API_URL;
const LLM_MODEL_ID = process.env.LLM_MODEL_ID;

export interface PentestResult {
    url: string;
    markdownReport: string;
    techStack?: string[];
    robotsStatus?: string;
    sitemapStatus?: string;
}

// --- Helper Functions for Reconnaissance ---

async function fetchRobotsTxt(baseUrl: string): Promise<string> {
    try {
        const robotsUrl = new URL('/robots.txt', baseUrl).toString();
        const res = await fetch(robotsUrl, {
            method: 'GET',
            headers: { 'User-Agent': 'ClawraSpecterBot/3.0 (Security Research)' }
        });
        if (!res.ok) return "Not Found (404)";
        const text = await res.text();
        return text.slice(0, 500); // Limit size for prompt
    } catch (e) {
        return "Failed to fetch";
    }
}

async function fetchSitemap(baseUrl: string): Promise<string> {
    try {
        const sitemapUrl = new URL('/sitemap.xml', baseUrl).toString();
        const res = await fetch(sitemapUrl, {
            method: 'GET',
            headers: { 'User-Agent': 'ClawraSpecterBot/3.0 (Security Research)' }
        });
        if (!res.ok) return "Not Found (404)";
        const text = await res.text();
        // Extract first 5 URLs for context using a simple regex
        const matches = text.match(/<loc>(.*?)<\/loc>/g);
        if (matches) {
            return matches.slice(0, 5).map(m => m.replace(/<\/?loc>/g, '')).join('\n');
        }
        return "Sitemap found but no URLs extracted.";
    } catch (e) {
        return "Failed to fetch";
    }
}

function detectTechStack(headers: Headers, html: string): string[] {
    const stack: string[] = [];
    const lowerHtml = html.toLowerCase();

    // Header checks
    const server = headers.get('server');
    if (server) stack.push(`Server: ${server}`);
    const xPowered = headers.get('x-powered-by');
    if (xPowered) stack.push(`X-Powered-By: ${xPowered}`);

    // HTML checks for common frameworks
    if (lowerHtml.includes('react')) stack.push('React');
    if (lowerHtml.includes('next.js') || lowerHtml.includes('__next')) stack.push('Next.js');
    if (lowerHtml.includes('vue')) stack.push('Vue.js');
    if (lowerHtml.includes('wp-content')) stack.push('WordPress');
    if (lowerHtml.includes('bootstrap')) stack.push('Bootstrap');
    if (lowerHtml.includes('tailwind')) stack.push('Tailwind CSS');
    if (lowerHtml.includes('jquery')) stack.push('jQuery');
    if (lowerHtml.includes('shopify')) stack.push('Shopify');

    return [...new Set(stack)]; // Unique values
}

// --- Main Analysis Function ---

export async function analyzeTarget(url: string, htmlContent: string, headers: Headers): Promise<PentestResult> {
    const $ = load(htmlContent);

    // 1. Advanced Recon Data Gathering
    const title = $('title').text() || "No Title";
    const metaTags = $('meta').map((i, el) => $(el).toString()).get().join('\n');

    // Extract external scripts to check for third-party risks
    const scripts = $('script').map((i, el) => $(el).attr('src')).get().filter(Boolean).join('\n');

    // Execute parallel recon tasks
    const [robotsTxt, sitemapSample] = await Promise.all([
        fetchRobotsTxt(url),
        fetchSitemap(url)
    ]);

    const techStack = detectTechStack(headers, htmlContent);

    // Extract specific security headers
    const securityHeaders = {
        'Content-Security-Policy': headers.get('content-security-policy') || 'MISSING',
        'X-Frame-Options': headers.get('x-frame-options') || 'MISSING',
        'Strict-Transport-Security': headers.get('strict-transport-security') || 'MISSING',
        'X-Content-Type-Options': headers.get('x-content-type-options') || 'MISSING',
        'Referrer-Policy': headers.get('referrer-policy') || 'MISSING',
        'Permissions-Policy': headers.get('permissions-policy') || 'MISSING'
    };

    const headersString = JSON.stringify(securityHeaders, null, 2);

    // 2. Construct Enhanced Prompt for Clawra Specter Blackbox
    // Modeled after professional pentest report structures (like Shannon's output style)
    const prompt = `
  You are Clawra Specter, an elite Autonomous Security Agent.
  You are performing a comprehensive spectral penetration test on: ${url}

  === RECONNAISSANCE LAYER ===
  [Target Profile]
  - Page Title: ${title}
  - Tech Stack Detected: ${techStack.length > 0 ? techStack.join(', ') : 'Unknown'}
  
  [Attack Surface]
  - Robots.txt (Disallowed Paths):
  ${robotsTxt || "None"}
  
  - Sitemap (Hidden Endpoints Sample):
  ${sitemapSample || "None"}
  
  - External Scripts (Third-party risks):
  ${scripts.slice(0, 500)}...

  [Security Posture]
  - Headers:
  ${headersString}

  === INSTRUCTIONS ===
  Perform a deeply technical security audit based on the above reconnaissance data. 
  Your goal is to replicate the "Proof by Exploitation" methodology (theoretically) used by advanced tools like Shannon.
  
  PHASE 1: ATTACK SURFACE ANALYSIS
  - Analyze 'robots.txt' entries. Are admins hiding sensitive directories (e.g., /admin, /backup, /config)?
  - Analyze the Tech Stack. Are there known historical vulnerabilities associated with these technologies (e.g., specific WP versions or outdated servers)?
  - Evaluate 'Script' sources. Any risky third-party integrations (trackers over http, old jquery)?

  PHASE 2: VULNERABILITY AUDIT (OWASP TOP 10)
  - Inspect Security Headers. Explain the *exact* impact of missing headers.
    - Missing CSP -> High risk of XSS payload execution.
    - Missing X-Frame-Options -> Clickjacking risk.
  - Review HTML structure.
  
  PHASE 3: EXPLOITABILITY ASSESSMENT
  - For each finding, provide a "Proof of Concept" (Theoretical) payload or attack vector.
  - Example: "If /admin is accessible via robots.txt, an attacker would attempt to bruteforce login."
  
  PHASE 4: REPORT GENERATION
  - Create a professional Markdown report.
  - Structure:
    # 👻 Clawra Specter Security Audit Report
    ## 🎯 Executive Summary
    ## 🕵️ Spectral Reconnaissance Findings (Tech Stack, Robots.txt analysis)
    ## 🔴 Critical Vulnerabilities
    ## 🟠 Medium Risks
    ## 🟢 Strengthening Recommendations
  - Assign a quantitative Security Score (0-100).
  
  OUTPUT FORMAT:
  Pure Markdown. No wrapper text. Be concise, technical, and authoritative.
  `;

    // 3. Call LLM
    if (!LLM_API_KEY || !LLM_API_URL || !LLM_MODEL_ID) {
        return {
            url,
            markdownReport: "## Configuration Error\n\nLLM API keys are missing. Cannot perform advanced analysis."
        };
    }

    try {
        const response = await fetch(`${LLM_API_URL}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${LLM_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: LLM_MODEL_ID,
                messages: [
                    {
                        role: "system",
                        content: "You are a senior penetration tester. You provide realistic, actionable security reports."
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0.2, // Low temperature for factual reporting
                max_tokens: 4000,
            }),
        });

        if (!response.ok) {
            throw new Error(`LLM API returned ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        const report = data.choices[0]?.message?.content || "Error generating report.";

        return {
            url,
            markdownReport: report,
            techStack,
            robotsStatus: robotsTxt.startsWith("Not Found") ? "Not Found" : "Analyzed",
            sitemapStatus: sitemapSample.includes("Sitemap found") ? "Analyzed" : "Not Found"
        };
    } catch (error) {
        return {
            url,
            markdownReport: `## Diagnosis Failed \n\nClawra Specter encountered a critical error during scanning. \n\nDebug: ${String(error)}`,
            techStack: [],
            robotsStatus: "Error",
            sitemapStatus: "Error"
        };
    }
}
