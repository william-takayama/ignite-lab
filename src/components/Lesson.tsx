import { isPast, format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { CheckCircle, Lock } from 'phosphor-react'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

export interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export function Lesson({
  availableAt,
  slug: slugProp,
  title,
  type,
}: LessonProps) {
  const { slug } = useParams<{ slug: string}>()

  const isLessonAvailable = isPast(availableAt)
  const availableDateFormatted = format(availableAt, "EEEE ' • ' MMM, dd ',' yyyy ' • ' k'h'mm", {
    locale: enUS
  })

  const isActiveLesson = slug === slugProp

  return (
    <Link to={`/event/lesson/${slugProp}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
        'bg-green-500': isActiveLesson,
      })}>
        <header className="flex items-center justify-between">
          {isLessonAvailable
            ? (
              <span className={classNames('text-sm font-medium flex items-center gap-2', {
                'text-white': isActiveLesson,
                'text-blue-500': !isActiveLesson,
              })}>
                <CheckCircle size={20} />
                Content released
              </span>
            ): (
              <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                <Lock size={20} />
                Soon
              </span>
            )
          }
          
          <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border font-bold', {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson,
          })}>
            {type === 'live' ? 'LIVE' : 'PRACTICAL LESSON'}
          </span>
        </header>

        <strong className={classNames('mt-5 block', {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson,
        })}>
          {title}
        </strong>
      </div>
    </Link>
  )
}
