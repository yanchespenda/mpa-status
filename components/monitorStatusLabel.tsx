import { KVMonitor } from 'config.interface'
import config from 'config.yaml'

interface IProps {
  kvMonitor?: KVMonitor
}

const classes: { [key: string]: string } = {
  gray: 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  green: 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
  yellow:
    'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
}

export default function MonitorStatusLabel({ kvMonitor }: IProps) {
  let color = 'gray'
  let text = 'No data'

  if (kvMonitor) {
    if (kvMonitor.lastCheck.operational) {
      color = 'green'
      text = 'Operational'
    } else {
      color = 'yellow'
      text = 'Not Operational'
    }
  }

  return <div className={`pill leading-5 ${classes[color]}`}>{text}</div>
}
