import { hashIp } from "./HashUtil";

export function getIpFromRequest(req: any) {
    let cf_ip = req.get('CF-Connecting-IP') // Get cloudflare ip
    let ip = cf_ip ? cf_ip : req.ip;

    ip = hashIp(ip);

    return ip;
}