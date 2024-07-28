import { Col, Row } from 'antd'
import Layout from '../components/Layout/Sidebar.js'
import '../styles/index.scss'
import Head from 'next/head.js'
import AdminLayout from '@/components/Layout/Layout.js'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TREEDIGIT</title>

        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Row>
          {/* <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout> */}
          <Component {...pageProps} />
        </Row>
      </SessionProvider>
    </>
  )
}
