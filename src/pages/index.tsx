import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [hashTag, setHashTag] = useState('#tentang')

  const handleClick = (e: any) => {
    e.preventDefault()

    const target = e.currentTarget.getAttribute('href')
    const offsetTop = document.querySelector(target).offsetTop

    setHashTag(target)

    window.scrollTo({
      top: offsetTop - 88,
      behavior: 'smooth',
      left: 0,
    })
  }

  return (
    <div className="flex h-screen w-screen flex-col scroll-smooth">
      <Head>
        <title>SIABUMDESA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
        {/* navbar */}
        <div className="sticky top-0 bg-white p-2">
          <div className="navbar flex justify-between rounded-xl border">
            {/* logo */}
            <div>
              <Link href="/">
                <a className="flex items-center text-xl">
                  <div className="avatar">
                    <div className="rounded-btn relative h-10 w-10">
                      <Image src="/assets/logo_square.png" layout="fill" />
                    </div>
                  </div>
                  <span className="font-bold">SIABUM</span>
                  <span className="font-extralight">DESA</span>
                </a>
              </Link>
            </div>
            {/* links */}
            <div className="space-x-5 uppercase">
              <a
                href="#tentang"
                className={`border-b-4 pb-1 ${
                  hashTag === '#tentang'
                    ? 'border-blue-700'
                    : 'border-b-transparent'
                }`}
                onClick={(e) => handleClick(e)}
              >
                Tentang
              </a>
              <a
                href="#laporan"
                className={`border-b-4 pb-1 ${
                  hashTag === '#laporan'
                    ? 'border-blue-700'
                    : 'border-b-transparent'
                }`}
                onClick={(e) => handleClick(e)}
              >
                Laporan
              </a>
            </div>

            {/* login button */}
            <Link href="/auth/login">
              <a className="btn-outline btn border-primary text-primary hover:btn-primary">
                Login
              </a>
            </Link>
          </div>
        </div>

        <div className="flex w-full justify-center p-2">
          <div className="container">
            {/* main */}
            <section id="tentang" className="mb-10 bg-green-50 p-2">
              <div className="border-l-4 border-blue-600 pl-3 font-bold uppercase">
                tentang
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates consequuntur iusto alias maiores cupiditate hic quae
                accusantium et nulla nihil aliquid nostrum incidunt, ea quo,
                quibusdam sed corporis totam laboriosam ipsa deleniti! Officiis
                odit dolor consequatur qui, delectus nam, deleniti voluptates
                asperiores illo exercitationem totam quibusdam ipsam. Incidunt
                est iste facilis. Dolore atque voluptatibus harum sed natus
                eveniet non consequatur, odit laboriosam soluta eius! Repellat
                non vero illo! Tenetur facere animi quaerat architecto libero
                error esse sapiente, veniam cum. Fugit quae, sequi hic nihil
                voluptatibus dolorem provident officia, numquam, blanditiis
                dolore vel aspernatur ad quaerat velit soluta deserunt id
                perspiciatis.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates consequuntur iusto alias maiores cupiditate hic quae
                accusantium et nulla nihil aliquid nostrum incidunt, ea quo,
                quibusdam sed corporis totam laboriosam ipsa deleniti! Officiis
                odit dolor consequatur qui, delectus nam, deleniti voluptates
                asperiores illo exercitationem totam quibusdam ipsam. Incidunt
                est iste facilis. Dolore atque voluptatibus harum sed natus
                eveniet non consequatur, odit laboriosam soluta eius! Repellat
                non vero illo! Tenetur facere animi quaerat architecto libero
                error esse sapiente, veniam cum. Fugit quae, sequi hic nihil
                voluptatibus dolorem provident officia, numquam, blanditiis
                dolore vel aspernatur ad quaerat velit soluta deserunt id
                perspiciatis.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates consequuntur iusto alias maiores cupiditate hic quae
                accusantium et nulla nihil aliquid nostrum incidunt, ea quo,
                quibusdam sed corporis totam laboriosam ipsa deleniti! Officiis
                odit dolor consequatur qui, delectus nam, deleniti voluptates
                asperiores illo exercitationem totam quibusdam ipsam. Incidunt
                est iste facilis. Dolore atque voluptatibus harum sed natus
                eveniet non consequatur, odit laboriosam soluta eius! Repellat
                non vero illo! Tenetur facere animi quaerat architecto libero
                error esse sapiente, veniam cum. Fugit quae, sequi hic nihil
                voluptatibus dolorem provident officia, numquam, blanditiis
                dolore vel aspernatur ad quaerat velit soluta deserunt id
                perspiciatis.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates consequuntur iusto alias maiores cupiditate hic quae
                accusantium et nulla nihil aliquid nostrum incidunt, ea quo,
                quibusdam sed corporis totam laboriosam ipsa deleniti! Officiis
                odit dolor consequatur qui, delectus nam, deleniti voluptates
                asperiores illo exercitationem totam quibusdam ipsam. Incidunt
                est iste facilis. Dolore atque voluptatibus harum sed natus
                eveniet non consequatur, odit laboriosam soluta eius! Repellat
                non vero illo! Tenetur facere animi quaerat architecto libero
                error esse sapiente, veniam cum. Fugit quae, sequi hic nihil
                voluptatibus dolorem provident officia, numquam, blanditiis
                dolore vel aspernatur ad quaerat velit soluta deserunt id
                perspiciatis.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates consequuntur iusto alias maiores cupiditate hic quae
                accusantium et nulla nihil aliquid nostrum incidunt, ea quo,
                quibusdam sed corporis totam laboriosam ipsa deleniti! Officiis
                odit dolor consequatur qui, delectus nam, deleniti voluptates
                asperiores illo exercitationem totam quibusdam ipsam. Incidunt
                est iste facilis. Dolore atque voluptatibus harum sed natus
                eveniet non consequatur, odit laboriosam soluta eius! Repellat
                non vero illo! Tenetur facere animi quaerat architecto libero
                error esse sapiente, veniam cum. Fugit quae, sequi hic nihil
                voluptatibus dolorem provident officia, numquam, blanditiis
                dolore vel aspernatur ad quaerat velit soluta deserunt id
                perspiciatis.
              </p>
            </section>

            <section id="laporan" className="mb-10 bg-blue-50 p-2">
              <div className="border-l-4 border-blue-600 pl-3 font-bold uppercase">
                laporan
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates consequuntur iusto alias maiores cupiditate hic quae
                accusantium et nulla nihil aliquid nostrum incidunt, ea quo,
                quibusdam sed corporis totam laboriosam ipsa deleniti! Officiis
                odit dolor consequatur qui, delectus nam, deleniti voluptates
                asperiores illo exercitationem totam quibusdam ipsam. Incidunt
                est iste facilis. Dolore atque voluptatibus harum sed natus
                eveniet non consequatur, odit laboriosam soluta eius! Repellat
                non vero illo! Tenetur facere animi quaerat architecto libero
                error esse sapiente, veniam cum. Fugit quae, sequi hic nihil
                voluptatibus dolorem provident officia, numquam, blanditiis
                dolore vel aspernatur ad quaerat velit soluta deserunt id
                perspiciatis.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates consequuntur iusto alias maiores cupiditate hic quae
                accusantium et nulla nihil aliquid nostrum incidunt, ea quo,
                quibusdam sed corporis totam laboriosam ipsa deleniti! Officiis
                odit dolor consequatur qui, delectus nam, deleniti voluptates
                asperiores illo exercitationem totam quibusdam ipsam. Incidunt
                est iste facilis. Dolore atque voluptatibus harum sed natus
                eveniet non consequatur, odit laboriosam soluta eius! Repellat
                non vero illo! Tenetur facere animi quaerat architecto libero
                error esse sapiente, veniam cum. Fugit quae, sequi hic nihil
                voluptatibus dolorem provident officia, numquam, blanditiis
                dolore vel aspernatur ad quaerat velit soluta deserunt id
                perspiciatis.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates consequuntur iusto alias maiores cupiditate hic quae
                accusantium et nulla nihil aliquid nostrum incidunt, ea quo,
                quibusdam sed corporis totam laboriosam ipsa deleniti! Officiis
                odit dolor consequatur qui, delectus nam, deleniti voluptates
                asperiores illo exercitationem totam quibusdam ipsam. Incidunt
                est iste facilis. Dolore atque voluptatibus harum sed natus
                eveniet non consequatur, odit laboriosam soluta eius! Repellat
                non vero illo! Tenetur facere animi quaerat architecto libero
                error esse sapiente, veniam cum. Fugit quae, sequi hic nihil
                voluptatibus dolorem provident officia, numquam, blanditiis
                dolore vel aspernatur ad quaerat velit soluta deserunt id
                perspiciatis.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates consequuntur iusto alias maiores cupiditate hic quae
                accusantium et nulla nihil aliquid nostrum incidunt, ea quo,
                quibusdam sed corporis totam laboriosam ipsa deleniti! Officiis
                odit dolor consequatur qui, delectus nam, deleniti voluptates
                asperiores illo exercitationem totam quibusdam ipsam. Incidunt
                est iste facilis. Dolore atque voluptatibus harum sed natus
                eveniet non consequatur, odit laboriosam soluta eius! Repellat
                non vero illo! Tenetur facere animi quaerat architecto libero
                error esse sapiente, veniam cum. Fugit quae, sequi hic nihil
                voluptatibus dolorem provident officia, numquam, blanditiis
                dolore vel aspernatur ad quaerat velit soluta deserunt id
                perspiciatis.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates consequuntur iusto alias maiores cupiditate hic quae
                accusantium et nulla nihil aliquid nostrum incidunt, ea quo,
                quibusdam sed corporis totam laboriosam ipsa deleniti! Officiis
                odit dolor consequatur qui, delectus nam, deleniti voluptates
                asperiores illo exercitationem totam quibusdam ipsam. Incidunt
                est iste facilis. Dolore atque voluptatibus harum sed natus
                eveniet non consequatur, odit laboriosam soluta eius! Repellat
                non vero illo! Tenetur facere animi quaerat architecto libero
                error esse sapiente, veniam cum. Fugit quae, sequi hic nihil
                voluptatibus dolorem provident officia, numquam, blanditiis
                dolore vel aspernatur ad quaerat velit soluta deserunt id
                perspiciatis.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="navbar flex justify-center border-t">
        <div className="mr-3">© {new Date().getFullYear()}</div>
        <Link href="/">
          <a className="flex items-center">
            <span className="font-bold">SIABUM</span>
            <span className="font-extralight">DESA</span>
          </a>
        </Link>
      </div>
    </div>
  )
}
