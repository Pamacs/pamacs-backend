import * as crypto from 'crypto';

export function hashPassword(data: {user_id: string, password: string}) {
    return crypto.scryptSync(data.password, data.user_id, 32).toString('base64');
}

export function hashIp(ip: string) {
    return crypto.createHash('md5').update(ip).digest('hex');
}
