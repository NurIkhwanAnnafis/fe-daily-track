export const cleanObject = (obj: Record<string, string>) => {
    const newObj: Record<string, string> = {}
    for (const key in obj) {
        if (obj[key] !== undefined && obj[key] !== null) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}
