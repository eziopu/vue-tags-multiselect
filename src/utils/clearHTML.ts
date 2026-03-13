export default function clearHTML(string: string): string {
  const regex = /\sdata-v-\w+=""/g
  return string.replace(regex, '')
}
