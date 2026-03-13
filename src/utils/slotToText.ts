import type { VNode } from 'vue'

export default function slotToText(children: VNode[]): string {
  return children
    .map((node) => {
      if (!node.children || typeof node.children === 'string') {
        return (node.children as string)?.replace(/\s/g, '') || ''
      } else if (Array.isArray(node.children)) {
        return slotToText(node.children as VNode[])
      } else if ((node.children as Record<string, unknown>).default) {
        return slotToText(
          ((node.children as Record<string, () => VNode[]>).default)()
        )
      }
      return ''
    })
    .join(' ')
}
