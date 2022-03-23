import { UseStore } from 'types/next'
import create from 'zustand'
import { UserDB } from './../../../types/next.d'

const useStore = create<UseStore>((set) => ({
  email: '',
  setEmail: (email) => set((state) => ({ ...state, email })),
  fullname: '',
  setFullname: (fullname) => set((state) => ({ ...state, fullname })),
  unitID: '',
  setUnitID: (unitID) => set((state) => ({ ...state, unitID })),
  kode: '',
  setKode: (kode) => set((state) => ({ ...state, kode })),
  description: '',
  needUpload: false,
  setNeedUpload: (needUpload) => set((state) => ({ ...state, needUpload })),
  setDescription: (description) => set((state) => ({ ...state, description })),
  posLaporan: 'labarugi',
  setPosLaporan: (posLaporan) => set((state) => ({ ...state, posLaporan })),
  posSaldo: 'debet',
  setPosSaldo: (posSaldo) => set((state) => ({ ...state, posSaldo })),

  idKodeAkun: '',
  setIdKodeAkun: (idKodeAkun) => set((state) => ({ ...state, idKodeAkun })),
  debet: 0,
  setDebet: (debet) => set((state) => ({ ...state, debet })),
  kredit: 0,
  setKredit: (kredit) => set((state) => ({ ...state, kredit })),
  saldo: 0,
  setSaldo: (saldo) => set((state) => ({ ...state, saldo })),
  qty: 0,
  setQty: (qty) => set((state) => ({ ...state, qty })),
  hargaSatuan: 0,
  setHargaSatuan: (hargaSatuan) => set((state) => ({ ...state, hargaSatuan })),
  total: 0,
  setTotal: (total) => set((state) => ({ ...state, total })),
  angsuran: 0,
  setAngsuran: (angsuran) => set((state) => ({ ...state, angsuran })),
  cash: 0,
  setCash: (cash) => set((state) => ({ ...state, cash })),
  keterangan: '',
  setKeterangan: (keterangan) => set((state) => ({ ...state, keterangan })),
  selectedOptionKodeAkun: { value: '', label: '' },
  setSelectedOptionKodeAkun: (selectedOptionKodeAkun) =>
    set((state) => ({ ...state, selectedOptionKodeAkun })),

  imgURL: '',
  setImgURL: (imgURL) => set((state) => ({ ...state, imgURL })),
  file: undefined,
  setFile: (file) => set((state) => ({ ...state, file })),
  imageSource: '',
  setImageSource: (imageSource: string) =>
    set((state) => ({ ...state, imageSource })),
  fileName: '',
  setFileName: (fileName: string) => set((state) => ({ ...state, fileName })),
  fileSize: 0,
  setFileSize: (fileSize: number) => set((state) => ({ ...state, fileSize })),
  fileExtension: '',
  setFileExtension: (fileExtension: string) =>
    set((state) => ({ ...state, fileExtension })),

  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set((state) => ({ ...state, isLoggedIn })),
  userInfo: null,
  setUserInfo: (userInfo: UserDB | null) =>
    set((state) => ({ ...state, userInfo })),
  authenticatedState: 'unauthenticated',
  setAuthenticatedState: (authenticatedState) =>
    set((state) => ({ ...state, authenticatedState })),
  isLoading: false,
  setIsLoading: (isLoading) => set((state) => ({ ...state, isLoading })),
  notification: { isOpen: false, type: '', message: '' },
  setNotification: (notification) =>
    set((state) => ({ ...state, notification })),
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set((state) => ({ ...state, sidebarOpen })),
  sorting: { sortBy: 'createdDate', sortType: 'desc' },
  setSorting: (sorting: { sortBy: string; sortType: 'asc' | 'desc' }) =>
    set((state) => ({ ...state, sorting })),
  selectItem: [],
  setSelectItem: (selectItem: string[]) =>
    set((state) => ({ ...state, selectItem })),
  dataLength: 0,
  setDataLength: (dataLength) => set((state) => ({ ...state, dataLength })),

  pageTotal: 0,
  setPageTotal: (pageTotal: number) =>
    set((state) => ({ ...state, pageTotal })),
  currentPage: 1,
  setCurrentPage: (currentPage: number) =>
    set((state) => ({ ...state, currentPage })),
  rowPerPage: 5,
  setRowPerPage: (rowPerPage: number) =>
    set((state) => ({ ...state, rowPerPage })),
  itemOffset: 0,
  setItemOffset: (itemOffset: number) =>
    set((state) => ({ ...state, itemOffset })),
}))

export default useStore
