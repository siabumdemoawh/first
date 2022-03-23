import { currentYear } from '@utils/misc/dateHelper'
import { Fragment } from 'react'

const YearCopyright = () => {
  return (
    <Fragment>
      © {currentYear === 2022 ? '2022' : `2022 - ${currentYear}`}{' '}
    </Fragment>
  )
}

export default YearCopyright
