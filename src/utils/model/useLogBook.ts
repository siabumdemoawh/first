import { generateUUID } from '@utils/misc/generateUUID'
import useStore from '@utils/misc/useStore'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { definitions } from 'types/supabase'
import supabase from './supabase'

export type LogBookJoin = definitions['log_book'] & {
  kode_akun: {
    kode: string
    deskripsi: string
    pos_laporan: string
    pos_saldo: string
  }
  units: {
    nama: string
  }
}

export type NewLogBook = {
  id: string
  kode: string
  description: string
  keterangan?: string
  pos_laporan: string
  pos_saldo: string
  saldo?: number
  debet_neraca?: number
  kredit_neraca?: number
  debet_labarugi?: number
  kredit_labarugi?: number
  form?: string
}

const useLogBook = () => {
  const {
    userInfo,
    setNotification,
    setIsLoading,
    setDataLength,
    rowPerPage,
    setPageTotal,
    setCurrentPage,
    setItemOffset,
    idKodeAkun,
    setIdKodeAkun,
    debet,
    setDebet,
    kredit,
    setKredit,
    saldo,
    setSaldo,
    qty,
    setQty,
    hargaSatuan,
    setHargaSatuan,
    total,
    setTotal,
    angsuran,
    setAngsuran,
    cash,
    setCash,
    keterangan,
    setKeterangan,
    selectedOptionKodeAkun,
    setSelectedOptionKodeAkun,
    selectItem,
    setSelectItem,
  } = useStore()
  const [logs, setLogs] = useState<NewLogBook[]>([])
  const { push } = useRouter()

  const getAllLog = async () =>
    await supabase
      .from<LogBookJoin>('log_book')
      .select(
        '*, kode_akun:kodeAkunID (kode,deskripsi,pos_laporan,pos_saldo), units:unitID (nama)'
      )
      .then(({ data, error }) => {
        if (error) {
          setNotification({
            isOpen: true,
            type: 'error',
            message: error.message,
          })
          return
        } else {
          const arrLogs: NewLogBook[] = []
          if (data) {
            data.map((item) => {
              arrLogs.push({
                id: item.id,
                kode: item.kode_akun.kode,
                description: item.kode_akun.deskripsi,
                keterangan: item.keterangan,
                pos_laporan: item.kode_akun.pos_laporan,
                pos_saldo: item.kode_akun.pos_saldo,
                saldo: item.saldo,
                debet_neraca:
                  item.kode_akun.pos_laporan === 'neraca' ? item.debet : 0,
                kredit_neraca:
                  item.kode_akun.pos_laporan === 'neraca' ? item.kredit : 0,
                debet_labarugi:
                  item.kode_akun.pos_laporan === 'labarugi' ? item.debet : 0,
                kredit_labarugi:
                  item.kode_akun.pos_laporan === 'labarugi' ? item.kredit : 0,
                form: item.form,
              })
            })
            setLogs(arrLogs)
            setDataLength(arrLogs.length)
            const pgTotal = Math.ceil(arrLogs.length / rowPerPage)

            setPageTotal(pgTotal)
            if (pgTotal === 1) {
              setCurrentPage(1)
              setItemOffset(0)
            }
          }
        }
      })

  const getLogBookById = async (id: string) =>
    id &&
    (await supabase
      .from<LogBookJoin>('log_book')
      .select(
        '*, kode_akun:kodeAkunID (kode,deskripsi,pos_laporan,pos_saldo), units:unitID (nama)'
      )
      .eq('id', id)
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error) {
          setNotification({
            isOpen: true,
            type: 'error',
            message: error.message,
          })
          return
        } else {
          if (data) {
            setSelectedOptionKodeAkun({
              value: data.kodeAkunID,
              label: `${data.kode_akun.kode} - ${data.kode_akun.deskripsi}`,
            })
            setDebet(data?.debet as number)
            setKredit(data?.kredit as number)
            setSaldo(data?.saldo as number)
            setQty(data?.qty as number)
            setHargaSatuan(data?.harga_satuan as number)
            setTotal(data?.total as number)
            setAngsuran(data?.angsuran as number)
            setCash(data?.cash as number)
            setKeterangan(data?.keterangan)
          }
        }
      }))

  const handleAddLogBook = async (
    e: FormEvent<HTMLFormElement>,
    form: string
  ) => {
    e.preventDefault()
    setIsLoading(true)

    await supabase
      .from('log_book')
      .insert([
        {
          id: generateUUID(),
          unitID: userInfo?.unitID,
          kodeAkunID: selectedOptionKodeAkun.value,
          debet: !debet ? 0 : debet,
          kredit: !kredit ? 0 : kredit,
          saldo: !saldo ? 0 : saldo,
          qty: !qty ? 0 : qty,
          harga_satuan: !hargaSatuan ? 0 : hargaSatuan,
          total: !total ? 0 : total,
          angsuran: !angsuran ? 0 : angsuran,
          cash: !cash ? 0 : cash,
          keterangan,
          createdBy: userInfo?.id,
          form,
        },
      ])
      .then(({ data, error }) => {
        if (error) {
          setNotification({
            isOpen: true,
            type: 'error',
            message: error.message,
          })
          setIsLoading(false)
          return
        } else {
          if (data) {
            setNotification({
              isOpen: true,
              type: 'success',
              message: 'Log Book berhasil ditambahkan',
            })
            resetFormLogBook()
            setTimeout(() => {
              setIsLoading(false)
              push('/dashboard/pembukuan')
            }, 1500)
          }
        }
      })
  }

  const handleEditLogBook = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault()
    setIsLoading(true)

    await supabase
      .from('log_book')
      .update({
        unitID: userInfo?.unitID,
        kodeAkunID: selectedOptionKodeAkun.value,
        debet: !debet ? 0 : debet,
        kredit: !kredit ? 0 : kredit,
        saldo: !saldo ? 0 : saldo,
        qty: !qty ? 0 : qty,
        harga_satuan: !hargaSatuan ? 0 : hargaSatuan,
        total: !total ? 0 : total,
        angsuran: !angsuran ? 0 : angsuran,
        cash: !cash ? 0 : cash,
        keterangan,
        updatedBy: userInfo?.id,
      })
      .eq('id', id)
      .then(({ data, error }) => {
        if (error) {
          setNotification({
            isOpen: true,
            type: 'error',
            message: error.message,
          })
          setIsLoading(false)
          return
        } else {
          if (data) {
            setNotification({
              isOpen: true,
              type: 'success',
              message: 'Log Book berhasil ditambahkan',
            })
            resetFormLogBook()
            setTimeout(() => {
              setIsLoading(false)
              push('/dashboard/pembukuan')
            }, 1500)
          }
        }
      })
  }

  const handleDeleteLogBook = () =>
    selectItem.map(
      async (id) =>
        await supabase
          .from<definitions['log_book']>('log_book')
          .delete()
          .eq('id', id)
          .then(async ({ error }) => {
            if (error) {
              setNotification({
                type: 'error',
                message: `Terjadi kesalahan saat menghapus data.`,
                isOpen: true,
              })
              setIsLoading(false)
              return
            } else {
              setSelectItem([])
              setNotification({
                type: 'success',
                message: `Data Input Debet Kredit Berhasil Dihapus.`,
                isOpen: true,
              })
              setIsLoading(false)
            }
          })
    )

  const resetFormLogBook = () => {
    setSelectedOptionKodeAkun({ value: '', label: '' })
    setDebet(0)
    setKredit(0)
    setSaldo(0)
    setQty(0)
    setHargaSatuan(0)
    setTotal(0)
    setAngsuran(0)
    setCash(0)
    setKeterangan('')
  }

  return {
    logs,
    getAllLog,
    resetFormLogBook,
    handleAddLogBook,
    getLogBookById,
    handleEditLogBook,
    handleDeleteLogBook,
  }
}

export default useLogBook
