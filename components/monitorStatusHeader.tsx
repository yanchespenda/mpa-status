// import config from '../../config.yaml'
// import { locations } from '../functions/locations'

interface IProps {}


const classes: any = {
  green:
    'bg-green-200 bg-green text-green-700 border-green-600',
  yellow:
    'bg-yellow-200 bg-yellow text-yellow-700 border-yellow-600',
}

export default function MonitorStatusHeader({ }: IProps) {
  let color = 'green'
  let text = 'All Systems Operational'

  // if (!kvMonitorsLastUpdate.allOperational) {
  //   color = 'yellow'
  //   text = 'Not All Systems Operational'
  // }

  return (
    <div className={`p-4 mb-4 font-semibold ${classes[color]}`}>
      <div className="flex flex-row justify-between items-center">
        <div>{ text }</div>
        {/* {kvMonitorsLastUpdate.time && typeof window !== 'undefined' && (
          <div className="text-xs font-light">
            checked{' '}
            {Math.round((Date.now() - kvMonitorsLastUpdate.time) / 1000)} sec
            ago (from{' '}
            {locations[kvMonitorsLastUpdate.loc] || kvMonitorsLastUpdate.loc})
          </div>
        )} */}
      </div>
    </div>
  )
}
