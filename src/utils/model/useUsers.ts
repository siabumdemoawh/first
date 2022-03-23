import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from '@supabase/supabase-js'
import useStore from '@utils/misc/useStore'
import supabase from '@utils/model/supabase'
import { useEffect, useState } from 'react'
import { UserDB } from 'types/next'
import { definitions } from 'types/supabase'

const useUsers = () => {
  const { setNotification } = useStore()
  const [users, setUsers] = useState<UserDB[] | null>([])
  const [user, setUser] = useState<definitions['users']>()

  useEffect(() => {
    const getUsers = async () =>
      await supabase
        .from('users')
        .select(`*, roles:roleID ( nama ), units:unitID ( nama )`)
        .then((res: PostgrestResponse<UserDB>) => {
          const { data, error } = res
          if (error) {
            return setNotification({
              isOpen: true,
              message: error.message,
              type: 'error',
            })
          }
          setUsers(data)
        })

    getUsers()

    return () => {
      setUsers([])
    }
  }, [])

  const createUser = async () => {}

  const updateUser = async () => {}

  const deleteUser = async () => {}

  const findUser = async (from: string, to?: string) =>
    await supabase
      .from('users')
      .select(`*, roles:roleID ( nama ), units:unitID ( nama )`)
      .eq(from, to)
      .limit(1)
      .single()
      .then((res: PostgrestSingleResponse<UserDB>) => res)

  const getUserById = async (id: string) =>
    await supabase
      .from<definitions['users']>('users')
      .select('*, roles:roleID(nama), units:unitID (nama)')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        console.log('user::', { data, error })
        if (data) {
          setUser(data)
        }
      })

  return {
    users,
    createUser,
    updateUser,
    deleteUser,
    findUser,
    getUserById,
    user,
  }
}

export default useUsers
