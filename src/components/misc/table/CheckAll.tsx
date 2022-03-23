import useHandler from '@utils/misc/useHandler'
import useStore from '@utils/misc/useStore'

const CheckAll = ({ data }: { data: any }) => {
  const { selectItem } = useStore()
  const { handleSelectAll } = useHandler()

  return (
    <th className="w-10">
      <input
        type="checkbox"
        checked={data.length > 0 && data.length === selectItem.length}
        className="checkbox checkbox-secondary"
        onChange={() => handleSelectAll(data)}
      />
    </th>
  )
}

export default CheckAll
