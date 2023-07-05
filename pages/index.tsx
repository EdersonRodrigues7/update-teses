import styles from './page.module.css'
import Head from 'next/head'

export default function Home() {
    return (
        <>
            <Head>
                <title>Update Teses</title>
                <meta name="description" content="API generated with Next" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>Welcome to Update Teses!</h1>
            </main>
        </>
    )
}