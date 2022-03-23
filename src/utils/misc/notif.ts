import { toast, ToastOptions } from 'react-toastify'

const options: ToastOptions = {
  autoClose: 2000,
  position: 'top-center',
}

const success = (message: string) => toast.success(message, options)

const info = (message: string) => toast.info(message, options)

const error = (message: string) => toast.error(message, options)

const notification = {
  success,
  info,
  error,
}

export default notification
