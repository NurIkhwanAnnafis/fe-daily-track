export const cleanObject = (obj: Record<string, string | number>) => {
    const newObj: Record<string, string | number> = {}
    for (const key in obj) {
        if (obj[key] !== undefined && obj[key] !== null) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}
