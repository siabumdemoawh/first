import fetchJson from '@utils/fetchJson'
import useStore from '@utils/misc/useStore'
import supabase from '@utils/model/supabase'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { HiChevronLeft } from 'react-icons/hi'
import { toast } from 'react-toastify'
import useSWR from 'swr'

const Register = () => {
  const {
    email,
    setEmail,
    unitID,
    setUnitID,
    isLoading,
    setIsLoading,
    notification,
    setNotification,
  } = useStore()
  const { push } = useRouter()

  const { data: unit } = useSWR('/api/get-unit', (url) => fetchJson(url))

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (!email) {
      setIsLoading(false)
      // return setNotification({
      //   isOpen: true,
      //   type: 'error',
      //   message: 'Email wajib diisi',
      // })
      return toast.error('Email wajib diisi', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }

    if (!unitID) {
      setIsLoading(false)
      // return setNotification({
      //   isOpen: true,
      //   type: 'error',
      //   message: 'Silakan pilih salah satu Unit',
      // })
      return toast.error('Silakan pilih salah satu Unit', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }

    const exists = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (exists) {
      setIsLoading(false)
      // return setNotification({
      //   isOpen: true,
      //   type: 'error',
      //   message: 'Email sudah terdaftar',
      // })
      return toast.error('Email sudah terdaftar. Silakan Login.', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }

    await axios('/api/register', {
      method: 'POST',
      data: { email, id_unit: unitID },
    }).then(({ data }) => {
      if (data.code === 200) {
        // push('/auth/login')
        setNotification({
          isOpen: true,
          type: 'success',
          message: `Pendaftaran berhasil, silahkan periksa email anda untuk melakukan verifikasi`,
        })
        setIsLoading(false)
      } else {
        setNotification({
          isOpen: true,
          type: 'error',
          message: `Terjadi kesalahan: ${data.message}`,
        })
        setIsLoading(false)
      }
      setEmail('')
      setUnitID('')
    })
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Image
        src="/assets/auth_background.png"
        layout="fill"
        className="-z-10"
      />

      <div className="glass flex w-80 flex-col rounded-lg p-2">
        <h1 className="mb-5 text-center uppercase text-primary">Daftar Akun</h1>
        <form onSubmit={handleRegister} className="space-y-3">
          <div className="form-control">
            <input
              type="text"
              className="input input-primary"
              placeholder="Email"
              autoComplete="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <select
              className="select"
              onChange={(e) => setUnitID(e.target.value)}
            >
              <option value="">Pilih Unit</option>
              {unit &&
                unit.data.map((item: any) => (
                  <option value={item.id} key={item.id}>
                    {item.nama_unit_desa}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-control">
            <button
              type="submit"
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            >
              Daftar
            </button>
          </div>
        </form>
        <div className="divider"></div>
        <div className="flex justify-between">
          <Link href="/auth/login">
            <a className="btn-link flex items-center text-xl">
              <HiChevronLeft />
              <span className="text-sm">Login</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
