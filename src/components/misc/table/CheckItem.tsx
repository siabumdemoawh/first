import useHandler from '@utils/misc/useHandler'
import useStore from '@utils/misc/useStore'

const CheckItem = ({ id }: { id: string }) => {
  const { selectItem } = useStore()
  const { handleSelect } = useHandler()

  return (
    <td>
      <input
        type="checkbox"
        className="checkbox checkbox-secondary"
        value={id}
        checked={selectItem.includes(id)}
        onChange={handleSelect}
      />
    </td>
  )
}

export default CheckItem
