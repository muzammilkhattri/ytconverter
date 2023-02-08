import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import download from "downloadjs"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { LoadingScreen } from "@/components/loadingscreen"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function IndexPage() {
  const [url, setUrl] = useState("")
  const [isLoading, setLoading] = useState(false)

  const handleMp3 = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, type: "mp3" }),
      }
      setLoading(true)
      fetch(`http://localhost:3000/api/yt`, requestOptions)
        .then((res) => res.blob())
        .then((blob) => {
          const sizeInBytes = blob.size
          console.log("sizeInBytes: ", sizeInBytes)
          if (sizeInBytes <= 0) {
            console.log(
              "Unable to download! Maybe File size is too high. Try to download video less than 5MB"
            )
          } else {
            setLoading(false)
            download(blob, `ytconverter-mp3.mp3`, "audio/mpeg")
          }
        })
    } catch (err) {
      console.log("err: ", err)
    }
  }
  const handleMp4 = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, type: "mp4" }),
      }
      setLoading(true)

      fetch(`http://localhost:3000/api/yt`, requestOptions)
        .then((res) => res.blob())
        .then((blob) => {
          const sizeInBytes = blob.size
          console.log("sizeInBytes: ", sizeInBytes)
          if (sizeInBytes <= 0) {
            console.log(
              "Unable to download! Maybe File size is too high. Try to download video less than 5MB"
            )
          } else {
            setLoading(false)
            download(blob, `ytconverter-mp4.mp4`, "video/mp4")
          }
        })
    } catch (err) {
      console.log("err: ", err)
    }
  }
  return (
    <Layout>
      <Head>
        <title>YT Converter</title>
        <meta
          name="description"
          content="Next.js template for building apps with Radix UI and Tailwind CSS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="w-full gap-2 mt-20">
          <h1 className="text-center font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Convert Youtube Videos <br className="hidden sm:inline" />
          </h1>
          <p className="max-w-md m-auto mt-10">
            Easily download YouTube videos in MP3 or MP4 format
          </p>
        </div>
        <div className="m-auto mt-8 w-full">
          <div className="flex w-2/3 space-x-2 m-auto">
            <Input
              type="email"
              placeholder="Video URL"
              onChange={(e) => {
                setUrl(e.target.value)
              }}
            />
            <Button type="submit" className="w-60" onClick={() => handleMp3()}>
              MP3
            </Button>
            <Button type="submit" className="w-60" onClick={() => handleMp4()}>
              MP4
            </Button>
          </div>
          <div
            className="mt-20"
            style={{
              display: isLoading ? "block" : "none",
            }}
          >
            <h1 className="font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-3xl lg:text-3xl text-center">
              Downloading
            </h1>
            <LoadingScreen></LoadingScreen>
          </div>
        </div>
      </section>
    </Layout>
  )
}
