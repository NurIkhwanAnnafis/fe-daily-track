export const createParams = (query: Record<string, unknown>) => {
    const newObj: Record<string, unknown> = {}
    for (const key in query) {
        if (query[key] !== undefined && query[key] !== null) {
            newObj[key] = query[key]
        }
    }
    return newObj
}
