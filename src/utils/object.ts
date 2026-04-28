export const cleanObject = (obj: Record<string, string | number>) => {
    const newObj: Record<string, string | number> = {}
    for (const key in obj) {
        if (obj[key] !== undefined && obj[key] !== null) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}

export const resolveValue = <T extends Record<string, any>>(value: T[keyof T]): React.ReactNode => {
    if (value === null || value === undefined) return null
    if (typeof value === 'object' && 'name' in value) return value.name
    return value
}
