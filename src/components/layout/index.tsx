import LogoSolid from '@components/assets/LogoSolid'
import YearCopyright from '@components/misc/YearCopyright'
import useStore from '@utils/misc/useStore'
import { adminMenu } from '@utils/model/data_menu'
import useAuth from '@utils/model/useAuth'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'
import { HiChartSquareBar, HiMenu, HiX } from 'react-icons/hi'
import { ToastContainer } from 'react-toastify'
const Tooltip = dynamic(() => import('@components/misc/Tooltip'))

const Layout: FC = (props) => {
  const { children } = props
  const { userInfo, sidebarOpen, setSidebarOpen } = useStore()
  const { asPath } = useRouter()
  const { handleLogout } = useAuth()

  return (
    <div className="h-screen w-screen">
      <ToastContainer />
      <div className=" flex h-full w-full flex-col">
        {/* TopNav */}
        <div className="z-10 flex w-full flex-none items-center justify-between bg-base-100 py-2 px-4 shadow-md">
          <div className="ml-auto flex h-10 flex-1 items-center space-x-2">
            <button
              className="btn btn-square btn-secondary btn-sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <HiX className="text-xl" />
              ) : (
                <HiMenu className="text-xl" />
              )}
            </button>
            <LogoSolid className="w-min" />
          </div>
          <div className="flex-none">
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        {/* Body */}
        <div className="z-0 flex h-full w-full flex-1">
          {/* Sidebar */}
          <div
            className={`flex h-full flex-col space-y-3 p-2
          ${
            sidebarOpen
              ? 'w-full flex-1 lg:w-96 lg:flex-none'
              : 'w-min md:w-min'
          }
        `}
          >
            <div className="flex flex-col items-center justify-center space-y-3 rounded-lg bg-base-200 p-2 shadow-md">
              <div
                className={`relative ${
                  sidebarOpen ? 'h-52 w-52' : 'h-10 w-10'
                }`}
              >
                <Image
                  src={
                    !userInfo?.avatar ? '/assets/avatar.png' : userInfo.avatar
                  }
                  quality={50}
                  layout="fill"
                />
              </div>
              {sidebarOpen && (
                <Fragment>
                  <h1 className="font-bold uppercase">{userInfo?.fullname}</h1>
                  <h1 className="font-extralight uppercase">
                    {userInfo?.roles.nama}
                  </h1>
                </Fragment>
              )}
            </div>

            <div className="h-full space-y-3 bg-base-200 p-2 shadow-md">
              {adminMenu.map((item) =>
                sidebarOpen ? (
                  <Link href={`${item.slug}`} key={item.slug}>
                    <a
                      className={`btn btn-block space-x-2 ${
                        asPath === `${item.slug}`
                          ? 'btn-secondary hover:pointer-events-none'
                          : 'btn-outline border-0 text-secondary hover:btn-secondary hover:text-white'
                      }`}
                    >
                      <HiChartSquareBar className="text-2xl" />
                      {sidebarOpen && <span>{item.title}</span>}
                    </a>
                  </Link>
                ) : (
                  <Tooltip
                    key={item.slug}
                    message={item.title}
                    className="flex flex-col items-center justify-center"
                  >
                    <Link href={`${item.slug}`}>
                      <a
                        className={`btn btn-square btn-sm mb-1 space-x-2 text-2xl md:btn-md md:text-5xl ${
                          asPath === `${item.slug}`
                            ? 'btn-secondary hover:text-white'
                            : 'btn-outline border-0 bg-opacity-20 text-secondary hover:btn-secondary hover:text-white'
                        }`}
                      >
                        <HiChartSquareBar />
                        {sidebarOpen && <span>{item.title}</span>}
                      </a>
                    </Link>
                    <small className="text-center text-xs text-secondary">
                      {item.title}
                    </small>
                  </Tooltip>
                )
              )}
            </div>
          </div>

          {/* Main */}
          <div
            className={`${
              sidebarOpen ? 'hidden md:flex' : 'flex'
            } h-full flex-1 flex-col space-y-5 overflow-hidden bg-base-100 shadow-md`}
          >
            <div className="flex-1 overflow-scroll p-2">
              <div className="breadcrumbs mb-5 text-sm">
                <ul>
                  {asPath.split('/').map((item, index) =>
                    index + 1 === asPath.split('/').length ? (
                      <li key={index}>{item}</li>
                    ) : (
                      <li key={index}>
                        <Link href={`/dashboard/${item}`}>
                          <a>{item}</a>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
              {children}
            </div>
            {/* Footer */}
            <div className="flex flex-none items-center justify-center bg-base-100 p-2">
              <div className="mr-3 h-5">
                <LogoSolid className="block w-min" />
              </div>
              <YearCopyright />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
