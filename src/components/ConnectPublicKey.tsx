import { FC, useState, useEffect, useRef, useCallback } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { PublicKey, Keypair } from "@solana/web3.js"

import Link from "next/link"

export const ConnectPublicKey: FC = () => {
  const keypair = Keypair.generate()
  const key = Buffer.from(keypair.secretKey).toString("hex")
  console.log("PublicKey", keypair.publicKey.toString())

  // const aes256 = require(`aes256`)
  // console.log("SecretKey", keypair.secretKey)
  // console.log("PubKey", keypair.publicKey.toString())

  // const encrypted = aes256.encrypt("test", Buffer.from(keypair.secretKey))
  // console.log("Encrypted", encrypted.toString())

  // const decrypted = aes256.decrypt("test", encrypted)
  // console.log("Decrypted", decrypted)

  // const secret = Uint8Array.from(decrypted)
  // const kp = Keypair.fromSecretKey(secret)
  // console.log("New Pubkey", kp.publicKey.toString())

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
          <button className="px-2 m-1 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-200 hover:to-yellow-500 ...">
            <Link href={key}>New Link</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
