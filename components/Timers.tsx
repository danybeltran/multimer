'use client'

import { useValue } from 'atomic-state'
import { timersState } from 'shared/states'
import Timer from './Timer'

function Timers() {
  const timers = useValue(timersState)

  return (
    <div className='space-y-4 py-4'>
      {timers.map(timer => (
        <Timer id={timer.id} paused={timer.paused} name={timer.name} key={`show-timer-${timer.id}`} />
      ))}
    </div>
  )
}

export default Timers
