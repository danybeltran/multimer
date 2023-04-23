'use client'

import { useEffect } from 'react'
import { Atom, atom, useActions, useAtom } from 'atomic-state'
import { BsPlay, BsArrowCounterclockwise } from 'react-icons/bs'
import { AiOutlinePause } from 'react-icons/ai'
import { FiTrash } from 'react-icons/fi'

import { timersState } from 'shared/states'

type TimerProps = {
  id: string
  name: string
  paused: boolean
}

const timers = new Map<
  string,
  {
    timer: Atom<{
      hours: number
      minutes: number
      seconds: number
    }>
  }
>()

function Timer({ id, name, paused }: TimerProps) {
  if (!timers.get(id)) {
    timers.set(id, {
      timer: atom({
        name: id,
        persist: true,
        default: {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      })
    })
  }

  // @ts-ignore
  const [timer, setTimer] = useAtom(timers.get(id).timer)
  // @ts-ignore

  const timersActions = useActions(timersState)

  useEffect(() => {
    const tm = setTimeout(() => {
      if (!paused) {
        if (timer.seconds === 59) {
          setTimer(prev => ({
            hours: prev.minutes === 59 ? prev.hours + 1 : prev.hours,
            minutes: prev.minutes === 59 ? 0 : prev.minutes + 1,
            seconds: 0
          }))
        } else {
          setTimer(prev => ({
            ...prev,
            seconds: prev.seconds + 1
          }))
        }
      }
    }, 1000)

    return () => {
      clearTimeout(tm)
    }
  }, [paused, timer])

  return (
    <div className='shadow p-2 pl-4 rounded-xl'>
      <h2 className='font-semibold text-xl'>{name || 'Unnamed timer'}</h2>
      <div className='flex items-center text-lg justify-between w-full'>
        <div className='flex items-center justify-between text-xl'>
          <div className='w-10'>{addZeros(timer.hours)}</div>
          <div className='w-10'>{addZeros(timer.minutes)}</div>
          <div className='w-10'>{addZeros(timer.seconds)}</div>
        </div>
        <div className='flex space-x-2'>
          <button
            className='btn btn-sm btn-ghost rounded-full w-10 h-10'
            onClick={() => {
              // Timer removal impl.
              const removeTimer = confirm('Remove timer ' + name)

              if (removeTimer) {
                timersActions.removeTimer({ id })
              }
            }}
          >
            <FiTrash className='text-2xl' />
          </button>
          <button
            className='btn btn-sm btn-ghost rounded-full w-10 h-10'
            onClick={() => {
              timersActions.changePause({
                id,
                value: true
              })
              setTimer({
                hours: 0,
                minutes: 0,
                seconds: 0
              })
            }}
          >
            <BsArrowCounterclockwise />
          </button>
          <button
            className='btn btn-sm btn-primary rounded-full w-10 h-10'
            onClick={() => {
              timersActions.changePause({
                id,
                value: !paused
              })
            }}
          >
            {paused ? <BsPlay /> : <AiOutlinePause />}
          </button>
        </div>
      </div>
    </div>
  )
}

function addZeros(n: number) {
  return `${n < 10 ? '0' : ''}${n}`
}

export default Timer
