import useStore from '@utils/misc/useStore'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import CheckAll from './CheckAll'
import GearIcon from './GearIcon'

const TableHeader = ({ data, arrThead }: { data: any; arrThead: any }) => {
  const { sorting, setSorting } = useStore()

  return (
    <thead>
      <tr>
        <CheckAll data={data} />
        {arrThead.map(
          (item: { label: string; value: string }, index: number) => (
            <th
              key={index + 1}
              className={`text-ellipsis text-center ${
                item.value === 'no' ? 'w-20' : 'w-min'
              }`}
            >
              {(item.value !== '' || item.label !== '') && (
                <button
                  className={`${
                    sorting.sortBy === item.value
                      ? 'btn-table-block-active'
                      : 'btn-table-block'
                  }`}
                  onClick={() =>
                    setSorting({
                      sortBy: item.value,
                      sortType: sorting.sortType === 'asc' ? 'desc' : 'asc',
                    })
                  }
                >
                  <div className="flex w-full">
                    <div className="flex-1">{item.label}</div>
                    {sorting.sortType === 'desc' ? (
                      <HiChevronDown className="flex-none" />
                    ) : (
                      <HiChevronUp className="flex-none" />
                    )}
                  </div>
                </button>
              )}
            </th>
          )
        )}
        <GearIcon />
      </tr>
    </thead>
  )
}

export default TableHeader
