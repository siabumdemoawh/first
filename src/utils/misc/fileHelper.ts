export const convertFileSize = (size: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const threshold = 1024
  let power = size > 0 ? Math.floor(Math.log(size) / Math.log(threshold)) : 0
  power = Math.min(power, units.length - 1)
  const reducedSize = size / Math.pow(threshold, power)
  const unit = units[power]
  return `${reducedSize.toFixed(2)} ${unit}`
}

const maxSize = 5120 // in KB

export const roundFileSize = (size: number) => Math.round(size / 1024)

export const overSize = (size: number) => Math.round(size / 1024) > maxSize

export const getOnlyFileName = (fileName: string) =>
  fileName.substring(0, fileName.lastIndexOf('.'))

export const getOnlyFileExtension = (fileName: string) =>
  fileName.substring(fileName.lastIndexOf('.'))

export const parseFileNameFromUrl = (url: string): string =>
  url.split('/').pop() as string

export const parseFileExtFromUrl = (url: string): string =>
  url.split('/')?.pop()?.split('.').pop() as string
