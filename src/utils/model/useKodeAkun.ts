import { generateUUID } from '@utils/misc/generateUUID'
import useStore from '@utils/misc/useStore'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { definitions } from 'types/supabase'
import { ValueLabelProps } from './../../../types/next.d'
import supabase from './supabase'

const useKodeAkun = () => {
  const {
    setNotification,
    setDataLength,
    rowPerPage,
    setPageTotal,
    setCurrentPage,
    setItemOffset,
    setIsLoading,
    kode,
    setKode,
    description,
    setDescription,
    posLaporan,
    setPosLaporan,
    posSaldo,
    setPosSaldo,
    needUpload,
    setNeedUpload,
    userInfo,
    selectItem,
    setSelectItem,
  } = useStore()
  const { push } = useRouter()

  const [allKodeAkun, setAllKodeAkun] = useState<
    definitions['kode_akun'][] | []
  >([])
  const [detailKodeAkun, setDetailKodeAkun] =
    useState<definitions['kode_akun']>()
  const [kodeAkunOptions, setKodeAkunOptions] = useState<ValueLabelProps[]>([])

  const getAllKodeAkun = async () =>
    await supabase
      .from<definitions['kode_akun']>('kode_akun')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          setNotification({
            isOpen: true,
            message: error?.message,
            type: 'error',
          })
        } else {
          if (data) {
            setAllKodeAkun(data)
            setDataLength(data.length)
            const pgTotal = Math.ceil(data.length / rowPerPage)

            setPageTotal(pgTotal)
            if (pgTotal === 1) {
              setCurrentPage(1)
              setItemOffset(0)
            }

            const arrKodeAkunOptions: ValueLabelProps[] = []
            data.map((item) => {
              arrKodeAkunOptions.push({
                value: item.id,
                label: `${item.kode.toString()} - ${item.deskripsi}`,
              })
            })
            setKodeAkunOptions(arrKodeAkunOptions)
          }
        }
      })

  const handleAddKodeAkun = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    // check if kode already exist or not
    const { data: dataExists } = await supabase
      .from<definitions['kode_akun']>('kode_akun')
      .select('kode')
      .eq('kode', kode)
      .limit(1)
      .single()

    if (dataExists?.kode) {
      setNotification({
        isOpen: true,
        message: 'Kode sudah digunakan.',
        type: 'error',
      })
      setIsLoading(false)
    } else if (dataExists?.deskripsi) {
      setNotification({
        isOpen: true,
        message: 'Deskripsi sudah digunakan.',
        type: 'error',
      })
      setIsLoading(false)
    } else {
      await supabase
        .from('kode_akun')
        .insert([
          {
            id: generateUUID(),
            kode,
            deskripsi: description,
            pos_laporan: posLaporan,
            pos_saldo: posSaldo,
            need_upload: needUpload,
            createdBy: userInfo?.id,
          },
        ])
        .then(({ data, error }) => {
          console.log('handleAddKodeAkun:::', { data, error })

          if (error) {
            setNotification({
              isOpen: true,
              message: error?.message,
              type: 'error',
            })
            setIsLoading(false)
          } else {
            if (data) {
              setNotification({
                isOpen: true,
                message: 'Data berhasil ditambahkan',
                type: 'success',
              })
              setKode('')
              setDescription('')
              setPosLaporan('labarugi')
              setPosSaldo('debet')
              setNeedUpload(false)
              setTimeout(() => {
                setIsLoading(false)
                push(`/dashboard/kode-akun`)
              }, 1500)
            }
          }
        })
    }
  }

  const handleEditKodeAkun = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault()

    setIsLoading(true)

    await supabase
      .from('kode_akun')
      .update({
        kode,
        deskripsi: description,
        pos_laporan: posLaporan,
        pos_saldo: posSaldo,
        need_upload: needUpload,
        updatedBy: userInfo?.id,
      })
      .eq('id', id)
      .then(({ data, error }) => {
        if (error) {
          setNotification({
            isOpen: true,
            message: error?.message,
            type: 'error',
          })
          setIsLoading(false)
        } else {
          if (data) {
            setNotification({
              isOpen: true,
              message: 'Data berhasil diperbarui',
              type: 'success',
            })
            setKode('')
            setDescription('')
            setPosLaporan('labarugi')
            setPosSaldo('debet')
            setNeedUpload(false)
            setTimeout(() => {
              setIsLoading(false)
              push(`/dashboard/kode-akun`)
            }, 1500)
          }
        }
      })
  }

  const handleDeleteKodeAkun = () =>
    selectItem.map(
      async (id) =>
        await supabase
          .from<definitions['kode_akun']>('kode_akun')
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
                message: `Data berhasil dihapus.`,
                isOpen: true,
              })
              setIsLoading(false)
              getAllKodeAkun()
            }
          })
    )

  const getKodeAkunById = async (id: string) =>
    id !== '' &&
    (await supabase
      .from<definitions['kode_akun']>('kode_akun')
      .select('*')
      .eq('id', id)
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error) {
          setNotification({
            isOpen: true,
            message: error?.message,
            type: 'error',
          })
        } else {
          if (data) {
            setKode(data.kode.toString())
            if (data.deskripsi) setDescription(data.deskripsi)
            if (data.pos_laporan) {
              if (data.pos_laporan === 'labarugi') setPosLaporan('labarugi')
              if (data.pos_laporan === 'neraca') setPosLaporan('neraca')
            }
            if (data.pos_saldo) {
              if (data.pos_saldo === 'debet') setPosSaldo('debet')
              if (data.pos_saldo === 'kredit') setPosSaldo('kredit')
            }
            if (data.need_upload) setNeedUpload(true)

            setDetailKodeAkun(data)
          }
        }
      }))

  const resetFormKodeAkun = () => {
    setKode('')
    setDescription('')
    setPosLaporan('labarugi')
    setPosSaldo('debet')
    setNeedUpload(false)
  }

  return {
    getAllKodeAkun,
    allKodeAkun,
    handleAddKodeAkun,
    handleEditKodeAkun,
    handleDeleteKodeAkun,
    getKodeAkunById,
    resetFormKodeAkun,
    kodeAkunOptions,
    detailKodeAkun,
  }
}

export default useKodeAkun
