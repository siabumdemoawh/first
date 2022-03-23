import Layout from '@components/layout'
import FormKodeAkun from '@components/misc/forms/FormKodeAkun'
import Head from 'next/head'
import React from 'react'

const TambahKodeAkun = () => {
  return (
    <Layout>
      <Head>
        <title>Tambah Kode Akun | SIABUMDESA</title>
      </Head>

      <FormKodeAkun formMethod="add" />
    </Layout>
  )
}

export default TambahKodeAkun
