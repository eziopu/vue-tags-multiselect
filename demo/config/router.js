import { createWebHashHistory, createRouter } from 'vue-router'

import HowToUse from '../components/how-to-use/main.vue'
import Attributes from '../components/app/main.vue'
import Slots from '../components/slots/main.vue'
import SlotDropdown from '../components/slot-dropdown/main.vue'
import SlotOption from '../components/slot-option/main.vue'
import Exposes from '../components/exposes/main.vue'
import Events from '../components/events/main.vue'
import Play from '../components/play-helps/main.vue'

const routes = [
  { path: '/', name: 'Install', component: HowToUse },
  { path: '/attributes', name: 'Attributes', component: Attributes },
  { path: '/slots', name: 'Slots', component: Slots },
  { path: '/slot-dropdown', name: 'Slot Dropdown', component: SlotDropdown },
  { path: '/slot-option', name: 'Slot Option', component: SlotOption },
  { path: '/exposes', name: 'Exposes', component: Exposes },
  { path: '/events', name: 'Events', component: Events },
  { path: '/play', name: 'Play', component: Play },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router