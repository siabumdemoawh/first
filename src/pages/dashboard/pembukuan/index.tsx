import Layout from '@components/layout'
import TopNavPembukuan from '@components/layout/pages/pembukuan/TopNavPembukuan'
import ActionButtonTable from '@components/misc/table/ActionButtonTable'
import CheckAll from '@components/misc/table/CheckAll'
import CheckItem from '@components/misc/table/CheckItem'
import GearIcon from '@components/misc/table/GearIcon'
import useStore from '@utils/misc/useStore'
import useLogBook from '@utils/model/useLogBook'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const PembukuanPage = () => {
  const { pathname } = useRouter()
  const { selectItem, itemOffset, rowPerPage, notification } = useStore()
  const { getAllLog, logs } = useLogBook()

  const arrThead = [
    { value: 'no', label: 'No' },
    { value: 'kode', label: 'Kode Akun' },
    { value: 'description', label: 'Deskripsi' },
    { value: 'keterangan', label: 'Keterangan' },
    { value: 'pos_laporan', label: 'Pos Laporan' },
    { value: 'pos_saldo', label: 'Pos Saldo' },
    { value: 'debet_neraca', label: 'Debet' },
    { value: 'kredit_neraca', label: 'Kredit' },
    { value: 'debet_labarugi', label: 'Debet' },
    { value: 'kredit_labarugi', label: 'Kredit' },
    { value: 'saldo', label: 'Saldo' },
  ]

  useEffect(() => {
    getAllLog()
  }, [pathname, selectItem.length])

  return (
    <Layout>
      <Head>
        <title>Pembukuan | SIABUMDESA</title>
      </Head>

      <div className="flex h-full w-full flex-col space-y-2 overflow-hidden">
        <TopNavPembukuan />

        <div className="h-full w-full flex-1 overflow-scroll">
          <table className="table-zebra table w-full">
            <thead>
              <tr>
                <CheckAll data={logs} />
                <th>No</th>
                <th>Kode Akun</th>
                <th>Deskripsi</th>
                <th>keterangan</th>
                <th>Pos Laporan</th>
                <th>Pos Saldo</th>
                <th>Debet</th>
                <th>Kredit</th>
                <th>Debet</th>
                <th>Kredit</th>
                <th>Saldo</th>
                <GearIcon />
              </tr>
            </thead>
            <tbody>
              {logs
                ?.slice(itemOffset, itemOffset + rowPerPage)
                .map((item, index) => (
                  <tr key={index}>
                    <CheckItem id={item.id} />
                    <td>{index + 1}</td>
                    <td className="w-20">{item.kode}</td>
                    <td>
                      <div className="w-96 overflow-hidden text-ellipsis">
                        <p className="truncate">{item.description}</p>
                      </div>
                    </td>
                    <td>
                      <div className="w-96 overflow-hidden text-ellipsis">
                        <p className="truncate">{item.keterangan}</p>
                      </div>
                    </td>
                    <td className="w-20">{item.pos_laporan}</td>
                    <td className="w-20">{item.pos_saldo}</td>
                    <td className="w-20">{item.debet_labarugi}</td>
                    <td className="w-20">{item.kredit_labarugi}</td>
                    <td className="w-20">{item.debet_neraca}</td>
                    <td className="w-20">{item.kredit_neraca}</td>
                    <td className="w-20">{item.saldo}</td>
                    <ActionButtonTable
                      editLink={`/dashboard/pembukuan/${item.form}/edit/${item.id}`}
                      viewLink={`/dashboard/pembukuan/${item.form}/view/${item.id}`}
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

export default PembukuanPage
