import { definitions } from './supabase'

export type UserDB = definitions['users'] & {
  roles: {
    nama: string
  }
  units: {
    id: string
    nama: string
  }
}

export type NotificationProps = {
  isOpen: boolean
  type: 'success' | 'error' | 'info' | ''
  message: string
}

export type ValueLabelProps = {
  value: string
  label: string
}

export type UseStore = {
  email: string
  setEmail: (email: string) => void
  fullname: string
  setFullname: (fullname: string) => void
  unitID: string
  setUnitID: (unitID: string) => void
  kode: string
  setKode: (kode: string) => void
  description: string
  setDescription: (description: string) => void
  needUpload: boolean
  setNeedUpload: (needUpload: boolean) => void
  posLaporan: 'labarugi' | 'neraca'
  setPosLaporan: (posLaporan: 'labarugi' | 'neraca') => void
  posSaldo: 'debet' | 'kredit'
  setPosSaldo: (posSaldo: 'debet' | 'kredit') => void

  idKodeAkun: string
  setIdKodeAkun: (idKodeAkun: string) => void
  debet: number
  setDebet: (debet: number) => void
  kredit: number
  setKredit: (kredit: number) => void
  saldo: number
  setSaldo: (saldo: number) => void
  qty: number
  setQty: (qty: number) => void
  hargaSatuan: number
  setHargaSatuan: (hargaSatuan: number) => void
  total: number
  setTotal: (total: number) => void
  angsuran: number
  setAngsuran: (angsuran: number) => void
  cash: number
  setCash: (cash: number) => void
  keterangan: string
  setKeterangan: (keterangan: string) => void

  imgURL: string // users avatar
  setImgURL: (imgURL: string) => void
  file: File | undefined
  setFile: (file: File | undefined) => void
  imageSource: string
  setImageSource: (imageSource: string) => void
  fileName: string
  setFileName: (fileName: string) => void
  fileSize: number
  setFileSize: (fileSize: number) => void
  fileExtension: string
  setFileExtension: (fileExtension: string) => void

  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  userInfo: UserDB | null
  setUserInfo: (userInfo: UserDB | null) => void
  authenticatedState: 'authenticated' | 'unauthenticated'
  setAuthenticatedState: (
    authenticatedState: 'authenticated' | 'unauthenticated'
  ) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  notification: NotificationProps
  setNotification: (notification: NotificationProps) => void
  sidebarOpen: boolean
  setSidebarOpen: (sidebarOpen: boolean) => void
  sorting: { sortBy: string; sortType: 'asc' | 'desc' }
  setSorting: (sorting: { sortBy: string; sortType: 'asc' | 'desc' }) => void
  selectItem: string[]
  setSelectItem: (selectItem: string[]) => void
  dataLength: number
  setDataLength: (dataLength: number) => void
  selectedOptionKodeAkun: { value: string; label: string }
  setSelectedOptionKodeAkun: (selectedOptionKodeAkun: {
    value: string
    label: string
  }) => void

  pageTotal: number
  setPageTotal: (pageTotal: number) => void
  currentPage: number
  setCurrentPage: (currentPage: number) => void
  rowPerPage: number
  setRowPerPage: (rowPerPage: number) => void
  itemOffset: number
  setItemOffset: (itemOffset: number) => void
}
