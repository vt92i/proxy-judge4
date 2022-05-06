/* eslint-disable @next/next/no-img-element */

import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const getServerSideProps: GetServerSideProps = async function (context: GetServerSidePropsContext) {
  context.req.headers["remote-address"] = context.req.socket.remoteAddress;
  context.req.headers["remote-port"] = context.req.socket.remotePort?.toString();

  let headers: object = Object.fromEntries(Object.entries(context.req.headers).sort());

  return {
    props: headers
  };
};

const App: NextPage = function (props: object) {
  return (
    <>
      <Head>
        <title>Proxy Judge</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <div className="p-4 flex flex-col justify-center items-center">
        <header className="tracking-wide flex flex-col items-center">
          <h2 className="text-4xl"> Proxy Judge </h2>
          <p className="text-md">Inspired by <a className="hover:underline" href="http://azenv.net/">AZENV</a></p>
          <Link href="https://github.com/vt92i/proxy-judge4/">
            <a>
              <img className="p-4 transition-all hover:scale-110" src="https://img.shields.io/badge/Github-181717.svg?style=for-the-badge&logo=github&logoColor=white" alt="Github" />
            </a>
          </Link>
        </header>

        <main>
          <div className="w-screen text-center">
            {Object.keys(props).map((key: string) => (
              <>
                <div className="p-2">
                  <div className="overflow-x-auto">
                    <span className="font-bold"> {key} </span>
                  </div>
                  <div className="overflow-x-auto">
                    <span className="font-normal"> {props[key as keyof object]} </span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </main>

        <footer className="flex flex-row items-center">
          <Link href="/api/judge/">
            <a>
              <img className="p-2 transition-all hover:scale-110" src="https://img.shields.io/badge/JSON%20API-000000.svg?style=for-the-badge&logo=json&logoColor=white" alt="JSON API" />
            </a>
          </Link>
          <Link href="https://vercel.com/">
            <a>
              <img className="p-2 transition-all hover:scale-110" src="https://img.shields.io/badge/Hosted%20on%20-000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
            </a>
          </Link>
        </footer>
      </div>
    </>
  );
};

export { getServerSideProps };
export default App;