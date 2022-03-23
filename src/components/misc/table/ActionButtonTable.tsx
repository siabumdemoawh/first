import useStore from '@utils/misc/useStore'
import Link from 'next/link'
import { FC } from 'react'
import { HiEye, HiPencil } from 'react-icons/hi'

export type ActionButtonTableProps = {
  viewLink: string
  editLink: string
}

const ActionButtonTable: FC<ActionButtonTableProps> = (props) => {
  const { viewLink, editLink } = props
  const { selectItem, isLoading } = useStore()

  return (
    <td className="flex space-x-2">
      <Link href={viewLink} passHref>
        <a
          className={`btn btn-sm ${
            isLoading ||
            (selectItem.length > 0 ? 'btn-disabled' : 'btn-primary')
          }`}
        >
          <HiEye className="text-xl" />
        </a>
      </Link>
      <Link href={editLink} passHref>
        <a
          className={`btn btn-sm ${
            isLoading ||
            (selectItem.length > 0 ? 'btn-disabled' : 'btn-secondary')
          }`}
        >
          <HiPencil className="text-xl" />
        </a>
      </Link>
    </td>
  )
}

export default ActionButtonTable
