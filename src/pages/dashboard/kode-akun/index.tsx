import Layout from '@components/layout'
import ActionButtonTable from '@components/misc/table/ActionButtonTable'
import CheckItem from '@components/misc/table/CheckItem'
import TableHeader from '@components/misc/table/TableHeader'
import useStore from '@utils/misc/useStore'
import useKodeAkun from '@utils/model/useKodeAkun'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const KodeAkunPage = () => {
  const {
    getAllKodeAkun,
    allKodeAkun,
    handleDeleteKodeAkun,
    resetFormKodeAkun,
  } = useKodeAkun()
  const { pathname } = useRouter()
  const { itemOffset, rowPerPage, selectItem } = useStore()

  const arrThead = [
    { value: 'no', label: 'No' },
    { value: 'kode', label: 'Kode Akun' },
    { value: 'description', label: 'Deskripsi' },
    { value: 'pos_laporan', label: 'Pos Laporan' },
    { value: 'pos_saldo', label: 'Pos Saldo' },
    { value: 'need_upload', label: 'Bukti Upload' },
  ]

  useEffect(() => {
    if (pathname === '/dashboard/kode-akun') getAllKodeAkun()
  }, [pathname])

  return (
    <Layout>
      <Head>
        <title>Daftar Kode Akun | SIABUMDESA</title>
      </Head>

      <div className="flex h-full w-full flex-col space-y-2 overflow-hidden">
        <div className="flex-none rounded-lg bg-rose-50 p-2">
          {selectItem.length > 0 ? (
            <button
              className="btn btn-secondary"
              onClick={handleDeleteKodeAkun}
            >
              Hapus {selectItem.length} Data
            </button>
          ) : (
            <Link href={`${pathname}/tambah`}>
              <a className="btn btn-secondary" onClick={resetFormKodeAkun}>
                Tambah Kode Akun
              </a>
            </Link>
          )}
        </div>

        <div className="h-full w-full flex-1 overflow-scroll">
          <table className="table-zebra table w-full">
            <TableHeader data={allKodeAkun} arrThead={arrThead} />
            <tbody>
              {allKodeAkun
                ?.slice(itemOffset, itemOffset + rowPerPage)
                .map((item, index) => (
                  <tr key={index}>
                    <CheckItem id={item.id} />
                    <td>{index + 1}</td>
                    <td className="w-20">{item.kode}</td>
                    <td>
                      <div className="w-96 overflow-hidden text-ellipsis">
                        <p className="truncate">{item.deskripsi}</p>
                      </div>
                    </td>
                    <td className="w-20">{item.pos_laporan}</td>
                    <td className="w-20">{item.pos_saldo}</td>
                    <td className="w-20">{item.need_upload ? '✅' : '❌'}</td>
                    <ActionButtonTable
                      editLink={`/dashboard/kode-akun/edit/${item.id}`}
                      viewLink={`/dashboard/kode-akun/view/${item.id}`}
                    />
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default KodeAkunPage
