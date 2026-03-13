import type { App, Plugin } from 'vue'
import vTagsMultiselect from './main.vue'
import vTagDropdown from './components/slots/v-dropdown.vue'
import vTagOption from './components/slots/v-option.vue'

export { vTagsMultiselect, vTagDropdown, vTagOption }

export type {
  TagModel,
  PlaceholdersModel,
  KeydownModel,
  AppCallOptionSetTag,
  TagsGroupByKeyModel,
  TagsGroupByKeyValueModel,
  DropdownStatusMap,
  OptionStatusMap,
  ProcessedDropdown,
  ProcessedOption,
  OptionsInput,
  VTagsMultiselectEmits,
} from './types'

const install: Plugin['install'] = (app: App) => {
  app.component('v-tags-multiselect', vTagsMultiselect)
  app.component('v-tag-dropdown', vTagDropdown)
  app.component('v-tag-option', vTagOption)
}

;(vTagsMultiselect as unknown as Record<string, unknown>).install = install

export default vTagsMultiselect
