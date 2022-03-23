import Layout from '@components/layout'
import TopNavPembukuan from '@components/layout/pages/pembukuan/TopNavPembukuan'
import Head from 'next/head'

const InputPengeluaranPage = () => {
  return (
    <Layout>
      <Head>
        <title>Input Pengeluaran | SIABUMDESA</title>
      </Head>

      <div className="flex h-full w-full flex-col space-y-2 overflow-hidden">
        <TopNavPembukuan />

        <div className="h-full w-full flex-1 overflow-scroll">
          <h1>Input Pengeluaran Page</h1>
        </div>
      </div>
    </Layout>
  )
}

export default InputPengeluaranPage
