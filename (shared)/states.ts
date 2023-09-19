import { atom } from 'atomic-state'

const defaultTimers: {
  paused: boolean
  name: string
  id: string
}[] = []

export const timersState = atom({
  name: 'timers',
  default: defaultTimers,
  persist: true,
  actions: {
    removeTimer({ args, dispatch }) {
      dispatch(timers => timers.filter(timer => timer.id !== args.id))
    },
    changePause({ args, dispatch }) {
      dispatch(timers =>
        timers.map(timer =>
          timer.id === args.id
            ? {
                ...timer,
                paused: args.value
              }
            : timer
        )
      )
    }
  }
})
