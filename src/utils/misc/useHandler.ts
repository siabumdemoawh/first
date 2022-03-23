import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { generateUUID } from '@utils/misc/generateUUID'
import useStore from '@utils/misc/useStore'
import supabase from '@utils/model/supabase'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent } from 'react'
import { UserDB } from 'types/next'
import constants from './constants'
import { getOnlyFileExtension, getOnlyFileName, overSize } from './fileHelper'

const useHandler = () => {
  const {
    email,
    setEmail,
    setNotification,
    fullname,
    selectItem,
    setSelectItem,
    dataLength,
    setIsLoading,
    description,
    setDescription,
    setImgURL,
    setFile,
    setImageSource,
    setFileName,
    fileSize,
    setFileSize,
    isLoading,
    setFileExtension,
    rowPerPage,
    setItemOffset,
    setCurrentPage,
    setFullname,
  } = useStore()
  const { push } = useRouter()

  /* ---------------------------------- AUTH ---------------------------------- */
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = { email }
    const config = {
      data: { fullname },
      redirectTo: constants.routes.register,
    }

    if (email === '') {
      setNotification({
        isOpen: true,
        message: 'Email wajib diisi.',
        type: 'error',
      })
      return
    }

    await supabase.auth
      .signUp(data, config)
      .then(async ({ user, session, error }) => {
        // if error occurs
        if (error) {
          // clear email & password field
          setEmail('')
          setFullname('')
          setNotification({
            isOpen: true,
            message: error.message,
            type: 'error',
          })
          return
        } else {
          await supabase
            .from('users')
            .insert({
              id: generateUUID(),
              email,
              fullname,
            })
            .then(({ error }) => {
              // clear email & password field
              setEmail('')
              setFullname('')

              if (error) {
                setNotification({
                  isOpen: true,
                  message: error?.message,
                  type: 'error',
                })
              } else {
                setNotification({
                  isOpen: true,
                  message: 'Silakan periksa email Anda.',
                  type: 'info',
                })
              }
            })
        }
      })
      .catch(() => {
        // if rejected, send notification
        setNotification({
          isOpen: true,
          message: 'Proses dibatalkan',
          type: 'error',
        })
      })
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (email === '') {
      setNotification({
        isOpen: true,
        message: 'Email wajib diisi.',
        type: 'error',
      })
      setIsLoading(false)
      return
    }

    // check email
    const { data: user, error }: PostgrestSingleResponse<UserDB> =
      await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .limit(1)
        .single()

    // if no user found
    if (error || !user) {
      // clear email field
      setEmail('')
      setNotification({
        isOpen: true,
        message: 'Email tidak terdaftar.',
        type: 'error',
      })
      setIsLoading(false)
      return
    }

    // if user found, but status is not active
    if (!user.isActive) {
      // clear email field
      setEmail('')
      setNotification({
        isOpen: true,
        message: 'Akun belum diaktifkan. Silakan hubungi Admin.',
        type: 'info',
      })
      setIsLoading(false)
      return
    }

    await supabase.auth
      .signIn({ email })
      .then(({ error }) => {
        // clear email field
        setEmail('')

        // if error occurs
        if (error) {
          setNotification({
            isOpen: true,
            message: error.message,
            type: 'error',
          })
          setIsLoading(false)
        } else {
          setNotification({
            isOpen: true,
            message: 'Silakan periksa email Anda.',
            type: 'info',
          })
          setIsLoading(false)
        }
      })
      .catch(() => {
        // if rejected, send notification
        setNotification({
          isOpen: true,
          message: 'Proses dibatalkan',
          type: 'error',
        })
      })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut().then(() => push('/'))
  }

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    selectItem.includes(value)
      ? setSelectItem(selectItem.filter((item) => item !== value))
      : setSelectItem([...selectItem, value])
  }

  const handleSelectAll = (data: any) => {
    data.length === selectItem.length
      ? setSelectItem([])
      : setSelectItem(data.map((item: any) => item.id))
    // setSelectItem(data.map((item: any) => item.id))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // check if esc key is pressed
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      if (!file.type.match('image.*')) {
        setNotification({
          type: 'error',
          message: 'File harus berupa gambar.',
          isOpen: true,
        })
      } else {
        if (overSize(file.size)) {
          setNotification({
            type: 'error',
            message: 'File terlalu besar. Max 5MB.',
            isOpen: true,
          })
        }
        reader.onload = (onLoadEvent) => {
          setImageSource(onLoadEvent.target?.result as string)
          setFile(file)
          setFileSize(file.size)
          setFileName(getOnlyFileName(file.name))
          setFileExtension(getOnlyFileExtension(file.name))
        }
        reader.readAsDataURL(file)
      }
    } else {
      setFile(undefined)
      setImageSource('')
      setFileName('')
      setFileSize(0)
      setFileExtension('')
    }
  }

  /* --------------------------------- TOGGLE --------------------------------- */
  // notification
  const handleCloseNotification = () =>
    setNotification({
      isOpen: false,
      message: '',
      type: '',
    })

  // clear all input field
  const handleClearAll = () => {
    setEmail('')
    setDescription('')
    setImgURL('')
    setFile(undefined)
    setSelectItem([])
    setImageSource('')
    setFileName('')
    setFileSize(0)
    setFileExtension('')
  }

  const clearFileStates = () => {
    setFile(undefined)
    setImageSource('')
    setFileName('')
    setFileSize(0)
    setFileExtension('')
  }

  const handlePagination = (event: { selected: number }) => {
    const newOffset = (event.selected * rowPerPage) % dataLength
    setCurrentPage(event.selected + 1)
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`,
    //   (event.selected * rowPerPage) % dataLength
    // )
    setItemOffset(newOffset)
  }

  return {
    handleSignUp,
    handleCloseNotification,
    handleLogin,
    handleLogout,
    handleSelect,
    handleSelectAll,
    handleClearAll,
    handleFileChange,
    clearFileStates,
    handlePagination,
  }
}

export default useHandler
