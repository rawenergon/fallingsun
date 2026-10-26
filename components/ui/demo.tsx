"use client"

import Skiper39 from "@/components/ui/skiper39"
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer"

export default function Demo() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between">
      {/* Hero Section with Crowd Canvas, Noise, and Dashboard Button */}
      <section className="relative h-screen w-full">
        <Skiper39 />
      </section>

      {/* Halftone Wordmark Footer with RECOX */}
      <HalftoneWordmarkFooter wordmark="recox" label="RECOX" />
    </div>
  )
}
