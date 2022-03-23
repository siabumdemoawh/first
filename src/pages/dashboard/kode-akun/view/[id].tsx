import Layout from '@components/layout'
import FormKodeAkun from '@components/misc/forms/FormKodeAkun'
import useKodeAkun from '@utils/model/useKodeAkun'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ViewKodeAkun = () => {
  const { query } = useRouter()
  const { id } = query
  const { getKodeAkunById } = useKodeAkun()

  useEffect(() => {
    if (id) getKodeAkunById(id as string)
  }, [id])

  return (
    <Layout>
      <Head>
        <title>Detail Kode Akun | SIABUMDESA</title>
      </Head>

      <FormKodeAkun formMethod="view" />
    </Layout>
  )
}

export default ViewKodeAkun
