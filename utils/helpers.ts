import config from 'config.yaml'

const getOperationalLabel = (operational: any) => {
  return operational
    ? config.settings.monitorLabelOperational
    : config.settings.monitorLabelNotOperational
}

export async function getCheckLocation() {
  const res = await fetch('https://cloudflare-dns.com/dns-query', {
    method: 'OPTIONS',
  })
  return res.headers.get('cf-ray')?.split('-')[1]
}
