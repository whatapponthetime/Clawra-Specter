export interface PentestSession {
    ipAddress: string;
    scanCount: number;
    lastScanAt: Date;
}

export interface SecurityScanRequest {
    url: string;
    reset?: boolean;
}

export interface SecurityScanResponse {
    report: string;
    techStack: Record<string, string>;
    robotsStatus: string;
    sitemapStatus: string;
    remaining: number;
}
