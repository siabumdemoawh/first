import LogoSolid from '@components/assets/LogoSolid'
import useStore from '@utils/misc/useStore'
import useAuth from '@utils/model/useAuth'
import anime from 'animejs'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useRef } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const LoginPage = () => {
  const { setEmail, isLoading } = useStore()
  const { handleLogin } = useAuth()
  const logoRef = useRef(null)

  useEffect(() => {
    anime({
      targets: 'svg #animate',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'linear',
      loop: true,
      duration: 5000,
      direction: 'alternate',
      delay: function (el, i) {
        return i * 250
      },
    })
  }, [])

  return (
    <Fragment>
      <Head>
        <title>LOGIN | SIABUMDESA</title>
      </Head>

      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <Image
          src="/assets/auth_background.png"
          layout="fill"
          className="-z-10"
        />

        <div className="glass flex w-80 flex-col rounded-lg p-2">
          <LogoSolid ref={logoRef} className="mb-5" />
          <form onSubmit={handleLogin} className="space-y-3">
            <div className="form-control">
              <input
                type="text"
                className="input input-primary"
                placeholder="Email"
                required
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <button
                type="submit"
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              >
                Login
              </button>
            </div>
          </form>
          <div className="divider"></div>
          <div className="flex justify-between">
            <Link href="/">
              <a className="btn-link flex items-center text-xl">
                <HiChevronLeft />
                <span className="text-sm">Kembali</span>
              </a>
            </Link>
            <Link href="/auth/register">
              <a className="btn-link flex items-center text-xl">
                <span className="text-sm">Daftar</span>
                <HiChevronRight />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LoginPage
