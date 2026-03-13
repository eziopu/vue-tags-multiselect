import { computed } from 'vue'
import type { ProcessedDropdown, OptionsInput, DropdownInputObject, OptionInputObject } from '../types'
import { vDropdownProps, vOptionProps } from '../components/slots/models'

export default function useProcessOptions(props: Record<string, any>, dep: Record<string, any>) {

  const options = (props.options || {}) as OptionsInput

  function extractDefaults(propsDefinition: Record<string, { default: unknown }>): Record<string, unknown> {
    const defaults: Record<string, unknown> = {}

    Object.keys(propsDefinition).forEach((key) => {
      defaults[key] = propsDefinition[key].default
    })

    return defaults
  }

  const vDropdownTemplate: Record<string, unknown> = { ...extractDefaults(vDropdownProps()), ...{ values: [] } }
  const vOptionTemplate: Record<string, unknown> = { ...extractDefaults(vOptionProps()), ...{ element: undefined } }

  const processedOptions = computed<ProcessedDropdown[]>(() => {
    return convert(options)
  })

  function convertOption(input: string | OptionInputObject): Record<string, unknown> {
    if (Array.isArray(input)) {
      (dep.log as (...args: string[]) => void)(`props options convert()`, `option ${input} Invalid input format, string or object please`, `error`)
      return {}
    }
    if (typeof input === 'string') {
      return { ...vOptionTemplate, ...{ element: input, value: input } }
    }
    if (typeof input === 'object') {
      return {
        ...vOptionTemplate,
        ...input,
        element: input.element ?? input.value
      }
    }
    return {}
  }

  function convert(input: OptionsInput): ProcessedDropdown[] {
    if (Array.isArray(input)) {
      // [{ value: 'country', disabled: true, values: ['Māre', 'Eldia'] }, ... ]
      return input.map((item: DropdownInputObject) => {
        const dropdown: Record<string, unknown> = { ...vDropdownTemplate, ...item }
        dropdown.values = (dropdown.values as (string | OptionInputObject)[]).map((option: string | OptionInputObject) => {
          return convertOption(option)
        })
        return dropdown as unknown as ProcessedDropdown
      })
    } else if (typeof input === 'object') {
      // { country: ['Māre', 'Eldia'], remark: ['yes'] }
      // { country: [{ title: true, value: 'country' }, 'Māre', 'Eldia'], remark: ['yes'] }
      return Object.keys(input).map((key: string) => {
        const dropdown: Record<string, unknown> = { ...vDropdownTemplate, value: key }
        dropdown.values = (input as Record<string, (string | OptionInputObject)[]>)[key].map((option: string | OptionInputObject) => convertOption(option))
        return dropdown as unknown as ProcessedDropdown
      })

    } else {
      (dep.log as (...args: string[]) => void)('props options convert()', 'Invalid input format', 'error')
      throw new Error('Invalid input format')
    }
  }

  return {
    processedOptions
  }
}
