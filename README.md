This is a custom status page, originaly by [Eidam](https://github.com/eidam/cf-workers-status-page)

# MPA Status Page

<img style="width: 100%;height: auto" src="https://res.cloudinary.com/dslncjjz1/image/upload/v1636379332/storage/github/mpa-status.png" />

Built with:

- NextJs - TailwindCss
- Firebase Storage / Google Cloud Storage [S3 driver]
<!-- - Cloudflare Worker for Cron Job every 1 minute -->

# ENV

```
AWS_S3_ENDPOINT="S3_ENDPOINT"
AWS_S3_REGION="S3_REGION"
AWS_S3_BUCKET="S3_BUCKET"
AWS_S3_ACCESS_KEY="S3_ACCESS_KEY"
AWS_S3_SECRET_KEY="S3_SECRET_KEY"
STORE_FILENAME="mpa-status.json"
```

Note: Config status web page in config.yaml
