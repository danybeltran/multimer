'use client'

import AddTimerForm from 'components/AddTimerForm'
import Timers from 'components/Timers'

function HomePage() {
  return (
    <main>
      <AddTimerForm />
      <Timers />
    </main>
  )
}

export default HomePage
