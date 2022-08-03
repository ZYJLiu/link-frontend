import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
  Transaction,
  PublicKey,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js"
import {
  getAssociatedTokenAddress,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  getAccount,
  Account,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createTransferInstruction,
} from "@solana/spl-token"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import styles from "../styles/Home.module.css"
import { usdcAddress } from "../lib/addresses"
import { mapping } from "../lib/mapping"

export default function Promo() {
  const [balance, setBalance] = useState(0)
  const [usdcBalance, setUsdcBalance] = useState(0)
  const [txSig, setTxSig] = useState("")
  const [keypair, setKeypair] = useState<Keypair>(new Keypair())
  const [confirm, setConfirm] = useState(null)
  // const [amount, setAmount] = useState(0)
  const usdcMint = usdcAddress

  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ""
  }

  const router = useRouter()
  const { key } = router.query

  const { publicKey, sendTransaction } = useWallet()
  const connection = useConnection()

  // const mapping = {
  //   a: [0, 0, 0, 0],
  //   b: [0, 0, 0, 1],
  //   c: [0, 0, 0, 2],
  //   d: [0, 0, 0, 3],
  //   e: [0, 0, 0, 4],
  //   f: [0, 0, 0, 5],
  //   g: [0, 0, 0, 6],
  //   h: [0, 0, 0, 7],
  // }

  function generateKeypair() {
    let seed = []

    for (let i = 0; i < key.length; i++) {
      const u8s = mapping[key[i]]
      seed = seed.concat(u8s)
    }
    const keypair = Keypair.fromSeed(new Uint8Array(seed))
    setKeypair(keypair)
    console.log("public key:", keypair.publicKey.toString())
  }

  useEffect(() => {
    if (!router.isReady) return

    generateKeypair()
  }, [router.isReady])

  useEffect(() => {
    const getBalance = async () => {
      const balance =
        (await connection.connection.getBalance(keypair.publicKey)) /
        LAMPORTS_PER_SOL
      setBalance(balance)

      try {
        const receiverUsdcAddress = await getAssociatedTokenAddress(
          usdcMint,
          keypair.publicKey
        )

        const account = await getAccount(
          connection.connection,
          receiverUsdcAddress
        )
        setUsdcBalance(Number(account.amount) / 10 ** 6)
      } catch {}
    }
    getBalance()
  }, [keypair, confirm])

  const sendSol = async (event) => {
    event.preventDefault()
    if (!connection || !publicKey) {
      return
    }
    const transaction = new Transaction()

    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: keypair.publicKey,
      lamports: LAMPORTS_PER_SOL * event.target.amount.value,
    })

    transaction.add(sendSolInstruction)
    const transactionSignature = await sendTransaction(
      transaction,
      connection.connection
    )

    setTxSig(transactionSignature)
    const confirm = await connection.connection.confirmTransaction(
      transactionSignature
    )
    setConfirm(confirm)
  }

  const withdrawSol = async (event) => {
    event.preventDefault()
    if (!connection || !publicKey) {
      return
    }
    const transaction = new Transaction()

    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: publicKey,
      lamports: LAMPORTS_PER_SOL * event.target.amount.value,
    })

    transaction.add(sendSolInstruction)
    const transactionSignature = await sendAndConfirmTransaction(
      connection.connection,
      transaction,
      [keypair]
    )

    setTxSig(transactionSignature)

    const confirm = await connection.connection.confirmTransaction(
      transactionSignature
    )
    setConfirm(confirm)
  }

  const sendUsdc = async (event) => {
    event.preventDefault()
    if (!connection || !publicKey) {
      return
    }

    const receiverUsdcAddress = await getAssociatedTokenAddress(
      usdcMint,
      keypair.publicKey
    )

    const senderUsdcAddress = await getAssociatedTokenAddress(
      usdcMint,
      publicKey
    )

    const createAccountInstruction = createAssociatedTokenAccountInstruction(
      publicKey,
      receiverUsdcAddress,
      keypair.publicKey,
      usdcMint,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    )

    const transaction = new Transaction()

    let buyer: Account
    try {
      buyer = await getAccount(
        connection.connection,
        receiverUsdcAddress,
        "confirmed",
        TOKEN_PROGRAM_ID
      )
    } catch (error: unknown) {
      if (
        error instanceof TokenAccountNotFoundError ||
        error instanceof TokenInvalidAccountOwnerError
      ) {
        try {
          transaction.add(createAccountInstruction)
        } catch (error: unknown) {}
      } else {
        throw error
      }
    }

    const sendUsdcInstruction = createTransferInstruction(
      senderUsdcAddress, // source
      receiverUsdcAddress, // dest
      publicKey,
      event.target.amount.value * 10 ** 6,
      [],
      TOKEN_PROGRAM_ID
    )

    // add a bit extra
    const sendSolInstruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: keypair.publicKey,
      lamports: LAMPORTS_PER_SOL * 0.000204,
    })

    transaction.add(sendUsdcInstruction, sendSolInstruction)
    const transactionSignature = await sendTransaction(
      transaction,
      connection.connection
    )

    setTxSig(transactionSignature)
    const confirm = await connection.connection.confirmTransaction(
      transactionSignature
    )
    setConfirm(confirm)
  }

  const withdrawUsdc = async (event) => {
    event.preventDefault()
    if (!connection || !publicKey) {
      return
    }

    const receiverUsdcAddress = await getAssociatedTokenAddress(
      usdcMint,
      publicKey
    )

    const senderUsdcAddress = await getAssociatedTokenAddress(
      usdcMint,
      keypair.publicKey
    )

    const createAccountInstruction = createAssociatedTokenAccountInstruction(
      publicKey,
      receiverUsdcAddress,
      publicKey,
      usdcMint,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    )

    const transaction = new Transaction()

    let buyer: Account
    try {
      buyer = await getAccount(
        connection.connection,
        receiverUsdcAddress,
        "confirmed",
        TOKEN_PROGRAM_ID
      )
    } catch (error: unknown) {
      if (
        error instanceof TokenAccountNotFoundError ||
        error instanceof TokenInvalidAccountOwnerError
      ) {
        try {
          transaction.add(createAccountInstruction)
        } catch (error: unknown) {}
      } else {
        throw error
      }
    }

    const sendUsdcInstruction = createTransferInstruction(
      senderUsdcAddress, // source
      receiverUsdcAddress, // dest
      keypair.publicKey,
      event.target.amount.value * 10 ** 6,
      [],
      TOKEN_PROGRAM_ID
    )

    transaction.add(sendUsdcInstruction)
    const transactionSignature = await sendAndConfirmTransaction(
      connection.connection,
      transaction,
      [keypair]
    )

    setTxSig(transactionSignature)
    const confirm = await connection.connection.confirmTransaction(
      transactionSignature
    )
    setConfirm(confirm)
  }

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div>PublicKey: {keypair.publicKey.toString()}</div>
        <div>Sol Balance : {balance}</div>
        <div>USDC Balance : {usdcBalance}</div>
        <div>
          {publicKey ? (
            <div>
              <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input
                  id="amount"
                  type="decimal"
                  color="black"
                  className={styles.formField}
                  placeholder="e.g. 0.1"
                  required
                />
                <button
                  type="submit"
                  className="px-2 m-1 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-200 hover:to-yellow-500 ..."
                >
                  Fund
                </button>
              </form>
              <br />
              <form onSubmit={withdrawSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to Withdraw:</label>
                <input
                  id="amount"
                  type="decimal"
                  color="black"
                  className={styles.formField}
                  placeholder="e.g. 0.1"
                  required
                />
                <button
                  type="submit"
                  className="px-2 m-1 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-200 hover:to-yellow-500 ..."
                >
                  Withdraw
                </button>
              </form>
              <br />
              <form onSubmit={sendUsdc} className={styles.form}>
                <label htmlFor="amount">Amount (in USDC) to Send:</label>
                <input
                  id="amount"
                  type="decimal"
                  color="black"
                  className={styles.formField}
                  placeholder="e.g. 0.1"
                  required
                />
                <button
                  type="submit"
                  className="px-2 m-1 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-200 hover:to-yellow-500 ..."
                >
                  Fund
                </button>
              </form>
              <br />
              <form onSubmit={withdrawUsdc} className={styles.form}>
                <label htmlFor="amount">Amount (in USDC) to Withdraw:</label>
                <input
                  id="amount"
                  type="decimal"
                  color="black"
                  className={styles.formField}
                  placeholder="e.g. 0.1"
                  required
                />
                <button
                  type="submit"
                  className="px-2 m-1 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-200 hover:to-yellow-500 ..."
                >
                  Withdraw
                </button>
              </form>
            </div>
          ) : (
            <span>Connect Your Wallet</span>
          )}
          {txSig ? (
            <div>
              <p>View your transaction on </p>
              <a href={link()}>Solana Explorer</a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
