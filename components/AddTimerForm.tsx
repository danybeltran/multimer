'use client'

import { useDispatch } from 'atomic-state'
import { useState } from 'react'
import { randomBytes } from 'crypto'

import { timersState } from 'shared/states'

function AddTimerForm() {
  const [addingTimer, setAddingTimer] = useState(false)

  const [timerName, setTimerName] = useState('')

  const setTimers = useDispatch(timersState)

  return (
    <div>
      <button
        className='btn'
        onClick={() => {
          setAddingTimer(true)
        }}
      >
        Add timer
      </button>

      <div
        className={`${
          addingTimer ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition fixed top-0 left-0 w-full h-full bg-neutral-800 bg-opacity-70 flex items-start justify-center p-4`}
      >
        <div
          className={`${
            addingTimer ? 'scale-100' : 'scale-0'
          } transition bg-white rounded-lg w-full md:w-1/3 p-5`}
        >
          <h2 className='text-lg font-semibold'>Add timer</h2>
          <div className='py-4'>
            {addingTimer && (
              <input
                value={timerName}
                onChange={e => {
                  setTimerName(e.target.value)
                }}
                autoFocus
                type='text'
                className='input w-full input-bordered'
                placeholder='Friendly name'
              />
            )}
          </div>
          <div className='pt-4 flex justify-between space-x-2'>
            <button
              className='btn btn-ghost w-1/2'
              onClick={() => {
                setAddingTimer(false)
              }}
            >
              Cancel
            </button>
            <button
              className='btn btn-primary w-1/2'
              onClick={() => {
                setTimers(prev => [
                  ...prev,
                  {
                    id: randomBytes(20).toString('hex'),
                    name: timerName,
                    paused: true
                  }
                ])

                setAddingTimer(false)
                setTimerName('')
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTimerForm
