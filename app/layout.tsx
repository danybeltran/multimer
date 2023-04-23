import 'bs-icon/icons.css'
import './globals.css'

import { AtomicState } from 'atomic-state'

export default async function MainLayout({ children }) {
  return (
    <AtomicState>
      <html className='h-full' data-theme='light'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>Multimer</title>
          <meta name='description' content='Concurrent timers' />
        </head>
        <body>
          <div className='p-4'>{children}</div>
        </body>
      </html>
    </AtomicState>
  )
}
