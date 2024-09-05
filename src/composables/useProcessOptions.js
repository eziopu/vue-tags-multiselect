import { computed } from "vue"
import { vDropdownProps, vOptionProps } from "../components/slots/models.js"

export default function useProcessOptions(props, _context, dep) {

  const options = props.options || {}

  const vDropdownTemplate = { ...vDropdownProps(), ...{ values: [] } }
  const vOptionTemplate = { ...vOptionProps(), ...{ element: undefined } }

  const processedOptions = computed(() => {
    return convert(options)
  })

  function convertOption(input) {
    if (Array.isArray(input)) {
      dep.log(`props options convert()`, `option ${input} Invalid input format, string or object please`, `error`)
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
      };
    }
    return {}
  }

  function convert(input) {
    if (Array.isArray(input)) {
      // [{ value: 'country', disabled: true, values: ['Māre', 'Eldia'] }, ... ]
      return input.map(item => {
        const dropdown = { ...vDropdownTemplate, ...item } // 合併第一層
        dropdown.values = dropdown.values.map(option => {
          return convertOption(option)
        })
        return dropdown
      })
    } else if (typeof input === 'object') {
      // { country: ['Māre', 'Eldia'], remark: ['yes'] }
      // { country: [{ title: true, value: 'country' }, 'Māre', 'Eldia'], remark: ['yes'] }/
      return Object.keys(input).map(key => {
        const dropdown = { ...vDropdownTemplate, value: key }
        dropdown.values = input[key].map(option => convertOption(option))
        return dropdown
      })

    } else {
      dep.log("props options convert()", 'Invalid input format', "error")
      throw new Error("Invalid input format")
    }
  }

  console.log('props.options = ', props.options)
  console.log('processedOptions = ', processedOptions.value)

  return {
    processedOptions
  }
}
