import { locations } from 'utils/locations'

interface IProps {
  location: string
  avg: number
}

export default function MonitorDayAverage({ location, avg }: IProps) {
  return (
    <>
      <br />
      <small>
        {locations[location] || location}: {avg}ms
      </small>
    </>
  )
}
