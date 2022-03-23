import useStore from '@utils/misc/useStore'
import useLogBook from '@utils/model/useLogBook'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { HiBookOpen } from 'react-icons/hi'

const TopNavPembukuan = () => {
  const { selectItem } = useStore()
  const { pathname } = useRouter()
  const { resetFormLogBook, handleDeleteLogBook } = useLogBook()

  return (
    <div className="flex flex-none bg-rose-50 p-2">
      <div className="flex-1 space-x-2 rounded-lg">
        {selectItem.length > 0 ? (
          <button
            className="btn btn-secondary w-max"
            onClick={handleDeleteLogBook}
          >
            Hapus {selectItem.length} Data
          </button>
        ) : (
          <Fragment>
            <Link href={`/dashboard/pembukuan/input-debet-kredit`}>
              <a
                className={`btn ${
                  pathname === '/dashboard/pembukuan/input-debet-kredit'
                    ? ' btn-secondary'
                    : 'btn-outline btn-secondary'
                } `}
                onClick={resetFormLogBook}
              >
                Input Debet / Kredit
              </a>
            </Link>
            <Link href={`/dashboard/pembukuan/input-pendapatan`}>
              <a
                className={`btn ${
                  pathname === '/dashboard/pembukuan/input-pendapatan'
                    ? ' btn-secondary'
                    : 'btn-outline btn-secondary'
                } `}
                // onClick={resetFormKodeAkun}
              >
                Input Pendapatan
              </a>
            </Link>
            <Link href={`/dashboard/pembukuan/input-pendapatan-non-penjualan`}>
              <a
                className={`btn ${
                  pathname ===
                  '/dashboard/pembukuan/input-pendapatan-non-penjualan'
                    ? ' btn-secondary'
                    : 'btn-outline btn-secondary'
                } `}
                // onClick={resetFormKodeAkun}
              >
                Input Pendapatan Non Penjualan
              </a>
            </Link>
            <Link href={`/dashboard/pembukuan/input-pengeluaran`}>
              <a
                className={`btn ${
                  pathname === '/dashboard/pembukuan/input-pengeluaran'
                    ? ' btn-secondary'
                    : 'btn-outline btn-secondary'
                } `}
                // onClick={resetFormKodeAkun}
              >
                Input Pengeluaran
              </a>
            </Link>
          </Fragment>
        )}
      </div>

      {selectItem.length < 1 && (
        <div className="flex-none space-x-2">
          <Link href={`/dashboard/pembukuan/neraca`}>
            <a
              className={`btn ${
                pathname === '/dashboard/pembukuan/neraca'
                  ? ' btn-secondary'
                  : 'btn-outline btn-secondary'
              } `}
              // onClick={resetFormKodeAkun}
            >
              <HiBookOpen className="mr-2 text-2xl" />
              <span>Neraca</span>
            </a>
          </Link>
          <Link href={`/dashboard/pembukuan/laba-rugi`}>
            <a
              className={`btn ${
                pathname === '/dashboard/pembukuan/laba-rugi'
                  ? ' btn-secondary'
                  : 'btn-outline btn-secondary'
              } `}
              // onClick={resetFormKodeAkun}
            >
              <HiBookOpen className="mr-2 text-2xl" />
              <span>Laba Rugi</span>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default TopNavPembukuan
