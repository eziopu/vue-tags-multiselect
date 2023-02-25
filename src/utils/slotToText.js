export default function slotToText(children) {
  return children
    .map((node) => {
      if (!node.children || typeof node.children === "string") {
        return node.children.replace(/\s/g, "") || ""

      } else if (Array.isArray(node.children)) {
        return slotToText(node.children)

      } else if (node.children.default) {
        return slotToText(node.children.default())

      }
    })
    .join(" ")
}