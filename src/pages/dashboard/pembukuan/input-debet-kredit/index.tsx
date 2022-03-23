import Layout from '@components/layout'
import TopNavPembukuan from '@components/layout/pages/pembukuan/TopNavPembukuan'
import FormInputDebetKredit from '@components/misc/forms/FormInputDebetKredit'
import Head from 'next/head'

const InputDebetKreditPage = () => {
  return (
    <Layout>
      <Head>
        <title>Input Debet Kredit | SIABUMDESA</title>
      </Head>

      <div className="flex h-full w-full flex-col space-y-2 overflow-hidden">
        <TopNavPembukuan />

        <div className="h-full w-full flex-1 overflow-scroll">
          <FormInputDebetKredit formMethod="add" />
        </div>
      </div>
    </Layout>
  )
}

export default InputDebetKreditPage
