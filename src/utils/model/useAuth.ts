import useStore from '@utils/misc/useStore'
import supabase from '@utils/model/supabase'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'

const useAuth = () => {
  const { email, setEmail, setIsLoading, setNotification, setIsLoggedIn } =
    useStore()
  const { push } = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // check if user has activated
    const { data: checkUser, error: errorCheck } = await supabase
      .from('users')
      .select('isActive')
      .eq('email', email)
      .single()

    if (errorCheck) {
      setIsLoading(false)
      return setNotification({
        isOpen: true,
        message: errorCheck.message,
        type: 'error',
      })
    }

    if (checkUser.isActive === false) {
      setNotification({
        isOpen: true,
        message: 'Akun Anda belum diaktifkan. Silakan hubungi Admin',
        type: 'error',
      })
      setIsLoading(false)
      return
    }

    const { error } = await supabase.auth.signIn(
      { email },
      {
        redirectTo: '/dashboard',
      }
    )

    setIsLoading(false)
    setEmail('')

    if (error) {
      setNotification({
        isOpen: true,
        type: 'error',
        message:
          'Email atau password salah. Jika Anda belum memiliki akun, silahkan daftar terlebih dahulu. Jika Anda telah mendaftar, silahkan cek email Anda untuk melakukan verifikasi.',
      })
    } else {
      setNotification({
        isOpen: true,
        type: 'success',
        message: 'Silakan periksa email Anda.',
      })
    }
  }

  const handleLogout = async () => {
    const user = supabase.auth.user()

    await supabase.auth.signOut().then(async () => {
      await supabase
        .from('users')
        .update({
          isOnline: false,
        })
        .eq('id_user', user?.id)

      setIsLoggedIn(false)

      setNotification({
        isOpen: true,
        type: 'success',
        message: 'Anda telah logout',
      })

      push('/auth/login')
    })
  }

  return {
    handleLogin,
    handleLogout,
  }
}

export default useAuth
