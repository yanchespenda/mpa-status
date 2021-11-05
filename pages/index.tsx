import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import MonitorStatusHeader from "../components/monitorStatusHeader"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>MPA Status</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-between items-center p-4">
            <div className="flex flex-row items-center">
              <img className="h-8 w-auto" src="/logo_web.png" alt="logo" />
            </div>
            <div className="flex flex-row items-center">
              {/* {typeof window !== 'undefined' && <ThemeSwitcher />}
              <MonitorFilter active={slash} callback={filterByTerm} /> */}
            </div>
          </div>

            <MonitorStatusHeader />
        </div>
      </main>

      <footer className={`${styles.footer} flex flex-row`}>
      Powered by 
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vercel
        </a> {'&'}
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudflare Worker
        </a>
      </footer>
    </div>
  )
}

export default Home
