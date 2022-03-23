import useStore from '@utils/misc/useStore'
import useKodeAkun from '@utils/model/useKodeAkun'
import Link from 'next/link'
import { FC } from 'react'

const FormKodeAkun: FC<{ formMethod: string; id?: string }> = ({
  formMethod,
  id,
}) => {
  const {
    kode,
    setKode,
    description,
    setDescription,
    needUpload,
    setNeedUpload,
    posLaporan,
    setPosLaporan,
    posSaldo,
    setPosSaldo,
    isLoading,
  } = useStore()
  const { handleAddKodeAkun, handleEditKodeAkun } = useKodeAkun()

  return (
    <form
      className="w-full p-5 md:w-1/2"
      onSubmit={(e) =>
        formMethod === 'add' && !id
          ? handleAddKodeAkun(e)
          : handleEditKodeAkun(e, id as string)
      }
    >
      <h1 className="mb-5 border-b border-secondary pb-3 text-center font-bold uppercase text-secondary">
        {formMethod === 'add'
          ? 'Tambah Kode Akun'
          : formMethod === 'edit'
          ? 'Edit Kode Akun'
          : 'Detail Kode Akun'}
      </h1>
      <div className="space-y-5">
        {/* Kode Akun */}
        <div className="form-control">
          <input
            type="text"
            className="input input-secondary"
            disabled={isLoading || formMethod === 'view'}
            required
            maxLength={5}
            minLength={5}
            placeholder="Masukkan kode akun.."
            value={kode}
            onChange={(e) => setKode(e.target.value)}
          />
        </div>

        {/* Deskripsi */}
        <div className="form-control">
          <input
            type="text"
            className="input input-secondary"
            disabled={isLoading || formMethod === 'view'}
            required
            placeholder="Masukkan deskripsi.."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Pos Laporan */}
        <div className="form-control">
          <label className="label">Pos Laporan</label>
          <label className="label cursor-pointer">
            <span className="label-text">Laba Rugi</span>
            <input
              type="radio"
              name="posLaporan"
              className="radio radio-secondary"
              disabled={isLoading || formMethod === 'view'}
              checked={posLaporan === 'labarugi' ? true : false}
              onChange={() => setPosLaporan('labarugi')}
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Neraca</span>
            <input
              type="radio"
              name="posLaporan"
              className="radio radio-secondary"
              disabled={isLoading || formMethod === 'view'}
              checked={posLaporan === 'neraca' ? true : false}
              onChange={() => setPosLaporan('neraca')}
            />
          </label>
        </div>

        {/* Pos Saldo */}
        <div className="form-control">
          <label className="label">Pos Saldo</label>
          <label className="label cursor-pointer">
            <span className="label-text">Debet</span>
            <input
              type="radio"
              name="posSaldo"
              className="radio radio-secondary"
              disabled={isLoading || formMethod === 'view'}
              checked={posSaldo === 'debet' ? true : false}
              onChange={() => setPosSaldo('debet')}
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Kredit</span>
            <input
              type="radio"
              name="posSaldo"
              disabled={isLoading || formMethod === 'view'}
              className="radio radio-secondary"
              checked={posSaldo === 'kredit' ? true : false}
              onChange={() => setPosSaldo('kredit')}
            />
          </label>
        </div>

        {/* Butuh upload */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Butuh bukti upload?</span>
            <input
              type="checkbox"
              className="checkbox checkbox-secondary"
              disabled={isLoading || formMethod === 'view'}
              checked={needUpload}
              onChange={(e) => setNeedUpload(e.target.checked)}
            />
          </label>
        </div>

        <div className="flex justify-between border-t border-secondary pt-3">
          {/* Kembali */}
          <Link href="/dashboard/kode-akun">
            <a
              className="btn btn-ghost"
              aria-disabled={isLoading || formMethod === 'view'}
            >
              Kembali
            </a>
          </Link>
          {/* Submit */}
          {formMethod !== 'view' && (
            <button
              type="submit"
              className={`btn btn-secondary ${isLoading && 'loading'}`}
              disabled={isLoading || formMethod === 'view'}
            >
              {formMethod === 'add' ? 'Tambahkan' : 'Perbarui'}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default FormKodeAkun
