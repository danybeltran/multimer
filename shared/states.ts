import { atom } from 'atomic-state'

export const timersState = atom<
  {
    paused: boolean
    name: string
    id: string
  }[]
>({
  name: 'timers',
  default: [],
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
