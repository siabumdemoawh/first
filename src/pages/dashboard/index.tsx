import Layout from '@components/layout'
import useStore from '@utils/misc/useStore'
import useAuth from '@utils/model/useAuth'
import Head from 'next/head'

export default function Dashboard() {
  const { userInfo } = useStore()
  const { handleLogout } = useAuth()

  return (
    <Layout>
      <Head>
        <title>DASHBOARD | SIABUMDESA</title>
      </Head>

      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      <br />
      <button className="btn btn-secondary" onClick={handleLogout}>
        logout
      </button>
    </Layout>
  )
}
