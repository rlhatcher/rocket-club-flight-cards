import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/flight-card'

export default function FirstCard() {
  return (
    <Layout>
    <Head>
        <title>First Card</title>
    </Head>
      <h1>First Card</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}