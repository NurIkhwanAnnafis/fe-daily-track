import type { ColumnsType } from "antd/es/table"
import React from "react"
import { resolveValue } from "../../utils/object"

type ExpandedRowRenderProps<T> = {
  column?: ColumnsType<T>
  record: T
}

export const ExpandedRowRender = <T,>({ column, record }: ExpandedRowRenderProps<T>) => {
  return (
    <div className="flex flex-col gap-1 px-2 py-1">
      {column?.map((item, index) => {
        if (!item.responsive) return null;

        const dataIndex = item.key as keyof T;
        const value = dataIndex ? record[dataIndex] : undefined;

        let content: React.ReactNode = null;
        if (item.render) {
          const rendered = item.render(value, record, index);
          if (rendered && typeof rendered === 'object' && !React.isValidElement(rendered) && 'children' in rendered) {
            content = (rendered as any).children;
          } else {
            content = rendered as React.ReactNode;
          }
        } else if (dataIndex) {
          content = resolveValue(value) as React.ReactNode;
        }

        if (item.key === 'actions') {
          return (
            <div className="text-right" key={`expandable-item-${index}`}>
              {content}
            </div>
          )
        }

        return (
          <div className="flex gap-2" key={`expandable-item-${index}`}>
            <span className="font-semibold">
              {typeof item.title === 'function' ? item.title({}) : (item.title as React.ReactNode)}:
            </span>
            {content}
          </div>
        )
      })}
    </div>
  )
}
