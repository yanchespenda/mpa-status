import { Fragment } from "react"
import Head from 'next/head'
import Link from 'next/link'

interface IProps {}


export default function DetailIndex() {

  const currentYear = new Date().getFullYear().toString()

  return (
    <Fragment>
      <div>
        <Head>
          <title>MPA Status</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="container mx-auto px-4">
            <div className="flex flex-row justify-between items-center p-4">
              <Link href="/">
                <a>
                  <div className="flex flex-row items-center">
                    <img className="h-8 w-auto" src="/logo_web.png" alt="logo" />
                  </div>
                </a>
              </Link>
              <div className="flex flex-row items-center">
                {/* {typeof window !== 'undefined' && <ThemeSwitcher />}
                <MonitorFilter active={slash} callback={filterByTerm} /> */}
              </div>
            </div>

            {/* Monitor Header */}
            {
              // error ? (
              //   <MonitorStatusHeader
              //     isError={true}
              //     errorMessage={error.message || 'Something went wrong'}
              //   />
              // ) : (
              //   <MonitorStatusHeader
              //     kvMonitorsLastUpdate={data?.data?.lastUpdate}
              //   />
              // )
            }
            {/* End Monitor Header */}

            {/* List Status Monitor */}
            {/* {config.monitors.map((monitor, index) => 
              <MonitorCard
                key={index}
                monitor={monitor}
                data={data?.data?.monitors[monitor.id] || undefined}
              />
            )} */}
            {/* End List Status Monitor */}
          </div>
        </main>

        <footer className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center pb-5 mt-2 text-sm">
              <span>@2020 - { currentYear } MPA Project</span>
            </div>
            <span>
              Powered by {' '}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel
              </a> {' & '}
              <a
                href="https://firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Firebase Storage
              </a>
            </span>
          </div>
        </footer>
      </div>
    </Fragment>
  )
}