import crypto from 'crypto';
import jwt from 'jsonwebtoken'
const tokenSecret = "q6hE6NIiy5hUhg3pGcw"
const delimiter = "||"

export const newToken = (key) => {
    const hash = crypto.createHmac("sha256", tokenSecret);
    const timestamp = Date.now().toString();
    const toHmac = key + timestamp;
    const sha = hash.update(toHmac).digest('hex')
    const toEncode = sha + delimiter + key + delimiter + timestamp
    return Buffer.from(toEncode).toString('base64');
}

export const newAuthToken = userId => {
    const auth = jwt.sign({
        role: "auth",
        userId
    }, tokenSecret, {
        expiresIn: "1h"
    });
    const refresh = jwt.sign({
        role: "refresh",
        userId
    }, tokenSecret, {
        expiresIn: "1h"
    });
    return {
        auth,
        refresh
    }
}
export const verify = (token) => {
    const decoded = Buffer.from(token, 'base64').toString()
    const [hash, key, timestamp] = decoded.split(delimiter);
    if ((Date.now() - timestamp) / 1000 / 60 > 120) {
        return {
            valid: false,
            key: null
        }
    }
    const toCompare = crypto.createHmac('sha256', tokenSecret).update(key + timestamp).digest('hex');
    const valid = toCompare === hash
    return {
        valid,
        key
    }
}
export const verifyAuthToken = token => {
    try {
        const decoded = jwt.verify(token, tokenSecret)
        return {
            error: null,
            decoded
        }
    } catch (e) {
        return {
            error: e,
            decoded: null
        }
    }
}