import { provide } from 'vue'
import type { LogType } from '../types'
import { logKey, log2Key, log3Key } from '../injectionKeys'

export default function useLog(props: Record<string, any>) {
  const types: Record<LogType, string> = {
    info: 'background: #17a2b8; color: #fff',
    warning: 'background: #ffc107; color: #212529',
    success: 'background: #28a745; color: #fff',
    error: 'background: #dc3545; color: #fff',
    method: 'background: #333; color: #007bff',
  }

  // ============== METHODS ==============

  const title = '[v-tags-multiselect]'

  // context, type
  // method, context
  // method, context, type
  const log = (...strings: string[]): void => {
    if (props.debugLog == false) {
      return
    }

    const [method, context, type] = getParameter(strings)

    if (method == '') {
      console.log(
        `${title}: ` + `%c ${type} ` + `%c ${context}`,
        types[type as LogType],
        ''
      )
      return
    }

    console.log(
      `${title}: ` +
        `%c ${method}() ` +
        `%c ` +
        `%c ${type} ` +
        `%c ${context}`,
      types['method'],
      '',
      types[type as LogType],
      ''
    )
  }

  const log2 = (content: string): void => {
    if (props.debugLog == true) {
      console.log(`  > ${content}`)
    }
  }

  const log3 = (content: string, parameter: unknown): void => {
    if (props.debugLog == false) {
      return
    }

    const getBlankString = (number: number): string => {
      if (0 >= number) {
        return '  '
      }
      return new Array(number).fill(' ').join('')
    }

    const spaces = getBlankString(title.length - content.length)

    console.log(`${spaces}${content}:`, parameter)
  }

  const getParameter = (strings: string[] = []): string[] => {
    const defaultType = 'info'
    if (strings.length == 1) {
      return ['', strings[0], defaultType]
    }

    if (strings.length == 2) {
      return strings[1] in types
        ? ['', strings[0], strings[1]]
        : [strings[0], strings[1], defaultType]
    }

    if (strings.length == 3) {
      return [strings[0], strings[1], strings[2]]
    }
    return []
  }

  // ============== PROVIDE ==============

  provide(logKey, log)
  provide(log2Key, log2)
  provide(log3Key, log3)

  return {
    log,
    log2,
    log3,
  }
}
