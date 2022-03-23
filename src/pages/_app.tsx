import notification from '@utils/misc/notif'
import useStore from '@utils/misc/useStore'
import supabase from '@utils/model/supabase'
import useUsers from '@utils/model/useUsers'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const {
    setUserInfo,
    setIsLoggedIn,
    isLoggedIn,
    notification: notificationStore,
    setNotification,
    userInfo,
  } = useStore()
  const { findUser } = useUsers()
  const user = supabase.auth.user()
  const { push } = useRouter()

  useEffect(() => {
    if (user) {
      ;(async () => {
        const { data } = await findUser('email', user.email)
        if (data?.isActive) {
          setUserInfo(data)
          setIsLoggedIn(true)
        }
      })()
    }

    const auth = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (userInfo) {
          if (userInfo.isActive) {
            if (userInfo.roles.nama === 'SuperAdmin') {
              push(`/dashboard`)
            } else if (userInfo.roles.nama === 'Administrator') {
              push(`/dashboard/unit/${userInfo.unitID}`)
            } else {
              push(`/dashboard/unit/${userInfo.unitID}/user/${userInfo.id}`)
            }
          }
        } else {
          push('/auth/login')
        }

        if (user) {
          ;(async () => {
            const { data } = await findUser('email', user.email)
            if (data && data.isActive) {
              setUserInfo(data)
            } else {
              setUserInfo(null)
              setNotification({
                isOpen: true,
                type: 'error',
                message: 'Akun belum diaktifkan. Silakan hubungi Admin.',
              })
              push('/auth/login')
              setIsLoggedIn(false)
            }
          })()
          setIsLoggedIn(true)
        }
      }
      if (event === 'SIGNED_OUT') {
        setUserInfo(null)
        setIsLoggedIn(false)
      }
    })

    return () => {
      auth.data?.unsubscribe()
    }
  }, [isLoggedIn, userInfo?.isActive])

  useEffect(() => {
    if (notificationStore.isOpen) {
      if (notificationStore.type === 'success') {
        notification.success(notificationStore.message)
      } else if (notificationStore.type === 'error') {
        notification.error(notificationStore.message)
      } else {
        notification.info(notificationStore.message)
      }
    }
  }, [notificationStore])

  return <Component {...pageProps} />
}

export default MyApp
