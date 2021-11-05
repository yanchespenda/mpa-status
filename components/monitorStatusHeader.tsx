import { KVLastUpdate } from 'config.interface'
import config from 'config.yaml'
import { locations } from 'utils/locations'

interface IProps {
  kvMonitorsLastUpdate?: KVLastUpdate
  isError?: boolean
  errorMessage?: string
}


const classes: { [key: string]: string } = {
  green:
    'bg-green-700 bg-green text-green-200 border-green-600',
  yellow:
    'bg-yellow-700 bg-yellow text-yellow-200 border-yellow-600',
  red:
    'bg-red-700 bg-red text-red-200 border-red-600',
}

export default function MonitorStatusHeader({ kvMonitorsLastUpdate, isError, errorMessage }: IProps) {
  let color = 'green'
  let text = config.settings.allmonitorsOperational

  if (isError) {
    color = 'red'
    text = errorMessage || 'Something went wrong'
  } else if (kvMonitorsLastUpdate && !kvMonitorsLastUpdate.allOperational) {
    color = 'yellow'
    text = config.settings.notAllmonitorsOperational
  }

  return (
    <div className={`p-4 mb-4 mt-2 font-semibold rounded-lg ${classes[color]}`}>
      <div className="flex flex-row justify-between items-center">
        <div>{ text }</div>
        {kvMonitorsLastUpdate && kvMonitorsLastUpdate.time && typeof window !== 'undefined' && (
          <div className="text-xs font-light">
            checked{' '}
            {Math.round((Date.now() - kvMonitorsLastUpdate.time) / 1000)} sec
            ago (from{' '}
            {locations[kvMonitorsLastUpdate.loc as string] || kvMonitorsLastUpdate.loc})
          </div>
        )}
      </div>
    </div>
  )
}
