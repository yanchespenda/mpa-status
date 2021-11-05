import type { NextApiRequest, NextApiResponse } from 'next'
import { S3 } from 'aws-sdk'

type Data = {
  message: string
  statusCode?: number
  data?: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const s3 = new S3({
    endpoint: process.env.AWS_S3_ENDPOINT as string,
    region: process.env.AWS_S3_REGION as string,
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY as string
    },
  })

  const params: S3.GetObjectRequest = {
    Key: process.env.STORE_FILENAME as string,
    Bucket: process.env.AWS_S3_BUCKET as string,
  };

  try {
    const getData = await s3.getObject(params).promise()
    if (getData.Body) {
      const getDataBody = JSON.parse(getData.Body?.toString()) || null
      return res.status(200).json({ message: 'OK', data: getDataBody })
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message, statusCode: error.statusCode || 500, data: null })
  }
}