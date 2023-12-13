export function verifyEmail(email) {
    const reg = new RegExp('@');
    if (reg.test(email)) {
        return true
    } else {
        return false
    }
}

export function verifyPassWord(passWord) {
    if (passWord.trim().length > 0) {
        return true
    } else {
        return false
    }
}