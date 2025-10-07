import { reactive } from 'vue'
import { seedData } from './seed'

interface globalStore {
  state: {
    data: typeof seedData
  }
  actions: {
    setActive: (id: number) => void
    setNewEvent: (event: string) => boolean
  }
  getters: {
    activeDay: () => (typeof seedData)[0] | undefined
  }
}

export const store: globalStore = {
  state: {
    data: reactive(seedData),
  },
  actions: {
    setActive(dayId: number) {
      store.state.data.map((dayObj) => {
        return dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false)
      })
    },
    setNewEvent(event: string): boolean {
      const activeDay = store.getters.activeDay()
      if (activeDay) {
        activeDay.events.push({ details: event, edit: false })
        return true;
      }
      return false;
    }
  },
  getters: {
    activeDay() {
      return store.state.data.find((day) => day.active)
    },
  },
}
