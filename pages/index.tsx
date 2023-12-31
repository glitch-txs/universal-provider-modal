import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useConnect } from '@/hooks/useConnect'

export default function Home() {

  const { connect, disconnect, isConnecting, provider } = useConnect()
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <button onClick={connect} >Connect</button>
        <button onClick={disconnect} >Disconnect</button>
        { provider ? 'Connect to WalletConnect' : "Initializing" }
        <br/>
        {isConnecting && "Connecting..."}
      </main>
    </>
  )
}
