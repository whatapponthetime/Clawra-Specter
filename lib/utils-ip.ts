import { NextRequest } from "next/server";

export function getClientIp(req: NextRequest): string {
    let ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    if (ip.includes(",")) {
        ip = ip.split(",")[0];
    }
    return ip;
}
