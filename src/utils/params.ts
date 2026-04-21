import dayjs from "dayjs"

type QueryValue = string | number | boolean | { value: string } | Array<{ value: string }>

export const createParams = (query: Record<string, QueryValue>) => {
    const newObj: Record<string, unknown> = {}
    for (const key in query) {
        if (query[key] !== undefined && query[key] !== null) {
            if (Array.isArray(query[key])) {
                newObj[key] = query[key].map((item) => item.value).join(',')
            } else if (typeof query[key] === 'object') {
                if (dayjs(query[key] as any).isValid()) {
                    newObj[key] = dayjs(query[key] as any).format('YYYY-MM-DD')
                } else {
                    newObj[key] = query[key]?.value
                }
            } else {
                newObj[key] = query[key]
            }
        }
    }
    return newObj
}
