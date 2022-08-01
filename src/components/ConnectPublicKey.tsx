import { FC, useState, useEffect, useRef, useCallback } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { PublicKey, Keypair } from "@solana/web3.js"

import Link from "next/link"

export const ConnectPublicKey: FC = () => {
  const [key, setKey] = useState("")

  const mapping = {
    a: [0, 0, 0, 0],
    b: [0, 0, 0, 1],
    c: [0, 0, 0, 2],
    d: [0, 0, 0, 3],
    e: [0, 0, 0, 4],
    f: [0, 0, 0, 5],
    g: [0, 0, 0, 6],
    h: [0, 0, 0, 7],
  }

  function generateURLandKeypair() {
    let seed = []
    let url = ""

    for (let i = 0; i < 8; i++) {
      let rand = Math.floor(Math.random() * 8) //0-7
      let key = String.fromCharCode("a".charCodeAt() + rand) // random letter from 'a'-'h'
      url += key

      const u8s = mapping[key]
      seed = seed.concat(u8s)
    }

    setKey(url)
    console.log("url:", url)

    const keypair = Keypair.fromSeed(new Uint8Array(seed))
    console.log("public key:", keypair.publicKey.toString())
  }

  useEffect(() => {
    generateURLandKeypair()
  }, [])

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
          <Link href={key}>
            <button className="px-2 m-1 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-200 hover:to-yellow-500 ...">
              New Link
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
