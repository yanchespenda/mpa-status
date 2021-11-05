import { KVMonitor, Monitor } from 'config.interface'
import config from 'config.yaml'
import MonitorDayAverage from './monitorDayAverage'

interface IProps {
  monitorId: string
  kvMonitor?: KVMonitor
}

export default function MonitorHistogram({ monitorId, kvMonitor }: IProps) {
  let date = new Date()
  date.setDate(date.getDate() - config.settings.daysInHistogram)

  let content = null

  if (typeof window !== 'undefined') {
    content = Array.from(Array(config.settings.daysInHistogram).keys()).map(
      (key) => {
        date.setDate(date.getDate() + 1)
        const dayInHistogram = date.toISOString().split('T')[0]

        let bg = ''
        let dayInHistogramLabel = 'No data'

        // filter all dates before first check, then check the rest
        if (kvMonitor && kvMonitor.firstCheck <= dayInHistogram) {
          if (
            kvMonitor.checks.hasOwnProperty(dayInHistogram) &&
            kvMonitor.checks[dayInHistogram].fails > 0
          ) {
            bg = 'yellow'
            dayInHistogramLabel = `${kvMonitor.checks[dayInHistogram].fails} incident(s)`
          } else {
            bg = 'green'
            dayInHistogramLabel = 'All good'
          }
        }

        return (
          <div key={key} className="hitbox tooltip">
            <div className={`${bg} bar`} />
            <div className="content text-center py-1 px-2 mt-2 left-1/2 -ml-20 w-40 text-xs">
              {dayInHistogram}
              <br />
              <span className="font-semibold text-sm">
                {dayInHistogramLabel}
              </span>
              {kvMonitor &&
                kvMonitor.checks.hasOwnProperty(dayInHistogram) &&
                Object.keys(kvMonitor.checks[dayInHistogram].res).map((key) => {
                  return (
                    <MonitorDayAverage
                      key={key}
                      location={key}
                      avg={kvMonitor.checks[dayInHistogram].res[key].a}
                    />
                  )
                })}
            </div>
          </div>
        )
      },
    )
  }

  return (
    <div
      key={`${monitorId}-histogram`}
      className="flex flex-row items-center histogram"
    >
      {content}
    </div>
  )
}
