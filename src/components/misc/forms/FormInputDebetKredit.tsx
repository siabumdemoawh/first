import useStore from '@utils/misc/useStore'
import useKodeAkun from '@utils/model/useKodeAkun'
import useLogBook from '@utils/model/useLogBook'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import Select from 'react-select'

const FormInputDebetKredit: FC<{ formMethod: string; id?: string }> = ({
  formMethod,
  id,
}) => {
  const {
    isLoading,
    debet,
    setDebet,
    kredit,
    setKredit,
    keterangan,
    setKeterangan,
    selectedOptionKodeAkun,
    setSelectedOptionKodeAkun,
  } = useStore()
  const { kodeAkunOptions, getAllKodeAkun, getKodeAkunById, detailKodeAkun } =
    useKodeAkun()
  const { handleAddLogBook, handleEditLogBook } = useLogBook()

  useEffect(() => {
    getAllKodeAkun()
  }, [])

  useEffect(() => {
    getKodeAkunById(selectedOptionKodeAkun.value)
  }, [selectedOptionKodeAkun.value])

  return (
    <form
      className="w-full p-5 md:w-1/2"
      onSubmit={(e) =>
        formMethod === 'add'
          ? handleAddLogBook(e, 'input-debet-kredit')
          : handleEditLogBook(e, id as string)
      }
    >
      <h1 className="mb-5 border-b border-secondary pb-3 text-center font-bold uppercase text-secondary">
        {formMethod === 'add'
          ? 'Tambah Data Input Debet Kredit'
          : formMethod === 'edit'
          ? 'Edit Data Input Debet Kredit'
          : 'Detail Input Debet Kredit'}
      </h1>
      <div className="space-y-5">
        {/* Kode Akun */}
        <div className="form-control">
          <label htmlFor="kode_akun" className="label">
            <span className="label-text">Kode Akun</span>
          </label>
          {formMethod === 'view' ? (
            <input
              type="text"
              className="input input-secondary"
              disabled
              required
              value={selectedOptionKodeAkun.label}
            />
          ) : (
            <Select
              isDisabled={isLoading || formMethod === 'view'}
              options={kodeAkunOptions && kodeAkunOptions}
              defaultValue={selectedOptionKodeAkun}
              placeholder="Pilih Kode Akun"
              onChange={(e) => e && setSelectedOptionKodeAkun(e)}
            />
          )}
        </div>

        {/* Debet */}
        {detailKodeAkun?.pos_saldo === 'debet' && (
          <div className="form-control">
            <label htmlFor="debet" className="label">
              <span className="label-text">Debet</span>
            </label>
            <input
              type="number"
              className="input input-secondary"
              disabled={isLoading || formMethod === 'view'}
              required
              min={0}
              placeholder="Masukkan debet.."
              value={debet}
              onChange={(e) => setDebet(+e.target.value)}
            />
          </div>
        )}

        {/* Kredit */}
        {detailKodeAkun?.pos_saldo === 'kredit' && (
          <div className="form-control">
            <label htmlFor="kredit" className="label">
              <span className="label-text">Kredit</span>
            </label>
            <input
              type="number"
              className="input input-secondary"
              disabled={isLoading || formMethod === 'view'}
              required
              min={0}
              placeholder="Masukkan kredit.."
              value={kredit}
              onChange={(e) => setKredit(+e.target.value)}
            />
          </div>
        )}

        {(detailKodeAkun?.pos_saldo === 'debet' ||
          detailKodeAkun?.pos_saldo === 'kredit') && (
          <div className="form-control">
            <label htmlFor="keterangan" className="label">
              <span className="label-text">Keterangan</span>
            </label>
            <input
              type="text"
              className="input input-secondary"
              disabled={isLoading || formMethod === 'view'}
              required
              placeholder="Masukkan keterangan.."
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </div>
        )}

        <div className="flex justify-between border-t border-secondary pt-3">
          {/* Kembali */}
          <Link href="/dashboard/pembukuan">
            <a
              className="btn btn-ghost"
              // aria-disabled={isLoading || formMethod === 'view'}
            >
              Kembali
            </a>
          </Link>

          {/* Submit */}
          {formMethod !== 'view' && (
            <button
              type="submit"
              className={`btn btn-secondary ${isLoading && 'loading'}`}
              disabled={isLoading}
            >
              {formMethod === 'add' ? 'Tambahkan' : 'Perbarui'}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default FormInputDebetKredit
