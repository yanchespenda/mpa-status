import type { NextApiRequest, NextApiResponse } from 'next'
import config from 'config.yaml'
import { S3 } from 'aws-sdk'

import {
  getCheckLocation,
} from 'utils/helpers'
import { KV } from 'config.interface'

function getDate() {
  return new Date().toISOString().split('T')[0]
}

type Data = {
  message: string
  statusCode?: number
  data?: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.group(`Cron init run`)

  // Get Worker PoP and save it to monitorsStateMetadata
  const checkLocation = await getCheckLocation()
  console.log(`checkLocation`, checkLocation)

  const checkDay = getDate()
  console.log(`checkDay`, checkDay)

  let monitorsState: KV | null = null

  const s3 = new S3({
    endpoint: process.env.AWS_S3_ENDPOINT as string,
    region: process.env.AWS_S3_REGION as string,
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY as string
    },
  })

  const s3ParamsDownload: S3.GetObjectRequest = {
    Key: process.env.STORE_FILENAME as string,
    Bucket: process.env.AWS_S3_BUCKET as string,
  };

  // Get monitors state from S3
  try {
    const getData = await s3.getObject(s3ParamsDownload).promise()
    if (getData.Body) {
      const getDataBody = JSON.parse(getData.Body?.toString()) || null
      monitorsState = getDataBody as KV
      console.log(`monitorsState:Load S3`, monitorsState)
    }
  } catch (error: any) {
    console.groupEnd()
    return res.status(500).json({ message: error.message, statusCode: error.statusCode || 500, data: null })
  }

  // Create empty state objects if not exists in S3 storage yet
  if (!monitorsState) {
    monitorsState = { lastUpdate: {allOperational: false, loc: undefined, time: undefined}, monitors: {} }
    console.log(`monitorsState:Create empty`, monitorsState)
  }

  // Reset default all monitors state to true
  monitorsState.lastUpdate.allOperational = true

  for (const monitor of config.monitors) {
    console.log(`Checking ${monitor.name} ...`)

    // Create default monitor state if does not exist yet
    if (typeof monitorsState.monitors[monitor.id] === 'undefined') {
      monitorsState.monitors[monitor.id] = {
        firstCheck: checkDay,
        lastCheck: {
          operational: false,
          status: 500,
          statusText: 'Unknown',
        },
        checks: {},
      }
    }

    // Fetch the monitors URL
    const init: RequestInit = {
      method: monitor.method || 'GET',
      redirect: monitor.followRedirect ? 'follow' : 'manual',
      headers: {
        'User-Agent': config.settings.userAgent || 'cf-worker-status-page',
      },
    }

    // Perform a check and measure time
    const requestStartTime = Date.now()
    const checkResponse = await fetch(monitor.url, init)
    const requestTime = Math.round(Date.now() - requestStartTime)
    console.log(`requestTime`, requestTime)

    // Determine whether operational and status changed
    const monitorOperational =
      checkResponse.status === (monitor.expectStatus || 200)
    const monitorStatusChanged =
      monitorsState.monitors[monitor.id].lastCheck.operational !==
      monitorOperational

    // Save monitor's last check response status
    monitorsState.monitors[monitor.id].lastCheck = {
      status: checkResponse.status,
      statusText: checkResponse.statusText,
      operational: monitorOperational,
    }

    // Send Slack message on monitor change
    // if (
    //   monitorStatusChanged &&
    //   typeof SECRET_SLACK_WEBHOOK_URL !== 'undefined' &&
    //   SECRET_SLACK_WEBHOOK_URL !== 'default-gh-action-secret'
    // ) {
    //   event.waitUntil(notifySlack(monitor, monitorOperational))
    // }

    // Send Telegram message on monitor change
    // if (
    //   monitorStatusChanged &&
    //   typeof SECRET_TELEGRAM_API_TOKEN !== 'undefined' &&
    //   SECRET_TELEGRAM_API_TOKEN !== 'default-gh-action-secret' &&
    //   typeof SECRET_TELEGRAM_CHAT_ID !== 'undefined' &&
    //   SECRET_TELEGRAM_CHAT_ID !== 'default-gh-action-secret'
    // ) {
    //   event.waitUntil(notifyTelegram(monitor, monitorOperational))
    // }

    // Send Discord message on monitor change
    // if (
    //   monitorStatusChanged &&
    //   typeof SECRET_DISCORD_WEBHOOK_URL !== 'undefined' &&
    //   SECRET_DISCORD_WEBHOOK_URL !== 'default-gh-action-secret'
    // ) {
    //   event.waitUntil(notifyDiscord(monitor, monitorOperational))
    // }

    // make sure checkDay exists in checks in cases when needed
    if (
      (config.settings.collectResponseTimes || !monitorOperational) &&
      !monitorsState.monitors[monitor.id].checks.hasOwnProperty(checkDay)
    ) {
      monitorsState.monitors[monitor.id].checks[checkDay] = {
        attemps: 0,
        fails: 0,
        res: {},
      }
    }

    if (config.settings.collectResponseTimes && monitorOperational) {
      // make sure location exists in current checkDay
      if (
        !monitorsState.monitors[monitor.id].checks[checkDay].res.hasOwnProperty(
          checkLocation as string,
        )
      ) {
        monitorsState.monitors[monitor.id].checks[checkDay].res[
          checkLocation as string
        ] = {
          n: 0,
          ms: 0,
          a: 0,
        }
      }

      // increment number of checks and sum of ms
      const no = ++monitorsState.monitors[monitor.id].checks[checkDay].res[
        checkLocation as string
      ].n
      const ms = (monitorsState.monitors[monitor.id].checks[checkDay].res[
        checkLocation as string
      ].ms += requestTime)

      // save new average ms
      monitorsState.monitors[monitor.id].checks[checkDay].res[
        checkLocation as string
      ].a = Math.round(ms / no)
    } else if (!monitorOperational) {
      // Save allOperational to false
      monitorsState.lastUpdate.allOperational = false

      // Increment failed checks, only on status change (maybe call it .incidents instead?)
      if (monitorStatusChanged) {
        monitorsState.monitors[monitor.id].checks[checkDay].fails++
      }
    }

    monitorsState.monitors[monitor.id].checks[checkDay].attemps++
  }

  // Save last update information
  monitorsState.lastUpdate.time = Date.now()
  monitorsState.lastUpdate.loc = checkLocation

  // Save monitorsState to S3 Storage
  const s3ParamsUpload: S3.PutObjectRequest = {
    Key: process.env.STORE_FILENAME as string,
    Bucket: process.env.AWS_S3_BUCKET as string,
    Body: JSON.stringify(monitorsState),
  };

  try {
    const sendData = await s3.upload(s3ParamsUpload).promise()
    console.log(`Saving S3`)
  } catch (error: any) {
    console.groupEnd()
    return res.status(500).json({ message: error.message, statusCode: error.statusCode || 500, data: null })
  }

  console.groupEnd()

  return res.status(200).json({ message: 'OK' })
}