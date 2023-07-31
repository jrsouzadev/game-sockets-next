export function generateId(length = 8) {
    const numbers = '1234567890'
    const letters = 'bcdfghjklmnpqrstvwxz'
    const characters = letters + numbers + letters.toUpperCase()
    let id = ''
    for (let i = 0; i < length; i++) {
        id = id + characters[Math.floor(Math.random() * characters.length)]
    }
    return id
}