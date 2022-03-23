import Layout from '@components/layout'
import TopNavPembukuan from '@components/layout/pages/pembukuan/TopNavPembukuan'
import FormInputDebetKredit from '@components/misc/forms/FormInputDebetKredit'
import useLogBook from '@utils/model/useLogBook'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const EditLogBookPage = () => {
  const { query } = useRouter()
  const { id } = query
  const { getLogBookById } = useLogBook()

  useEffect(() => {
    if (id) getLogBookById(id as string)
  }, [id])

  return (
    <Layout>
      <Head>
        <title>Input Debet Kredit | SIABUMDESA</title>
      </Head>

      <div className="flex h-full w-full flex-col space-y-2 overflow-hidden">
        <TopNavPembukuan />

        <div className="h-full w-full flex-1 overflow-scroll">
          <FormInputDebetKredit formMethod="edit" id={id as string} />
        </div>
      </div>
    </Layout>
  )
}

export default EditLogBookPage
