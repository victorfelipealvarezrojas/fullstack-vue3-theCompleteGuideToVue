import { reactive } from 'vue'
import { seedData } from './seed'

interface globalStore {
  state: {
    data: typeof seedData
  }
  actions: {
    setActive: (id: number) => void
    setNewEvent: (event: string) => boolean
    setEditEventActiveState: (dayId: number, eventDec: string) => void
    setEventDescription: (dayId: number, oldDec: string, newDec: string) => void
    deleteEvent: (dayId: number, details: string) => void
  }
  getters: {
    activeDay: () => (typeof seedData)[0] | undefined
    activeEventsDescription: (dayId: number) => string | undefined
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
        return true
      }
      return false
    },
    setEditEventActiveState(dayId: number, eventDec: string) {
      const day = store.state.data.find((day) => day.id === dayId)
      if (day) {
        day.events.find((event) => {
          if (event.details === eventDec) {
            event.edit = true
          } else {
            event.edit = false
          }
        })
      }
    },
    setEventDescription(dayId: number, oldDec: string, newDec: string) {
      const day = store.state.data.find((day) => day.id === dayId)
      if (day) {
        const event = day.events.find((event) => event.details === oldDec)
        if (event) {
          event.details = newDec
          event.edit = false
        }
      }
    },
    deleteEvent(dayId: number, details: string) {
      const day = store.state.data.find((day) => day.id === dayId)
      if (day) {
        day.events = day.events.filter((event) => event.details !== details)
      }
    },
  },
  getters: {
    activeDay() {
      return store.state.data.find((day) => day.active)
    },
    activeEventsDescription(dayId: number) {
      const day = store.state.data.find((day) => day.id === dayId)
      if (day) {
        return day.events.find((event) => event.edit === true)?.details;
      }
      return undefined
    },
  },
}
