

import React from "react"

import ImageInstruction from "@/app/(app)/_components/sections/ImageInstruction"
import Method from "./_components/sections/Method"
import HowItWorks from "./_components/sections/HowItWork"
import FAQ from "./_components/sections/FAQ"

const LandingPage = () => {
  return (
    <div>
      <ImageInstruction />
      <Method />
      <HowItWorks />
      <FAQ />
    </div>
  )
}

export default LandingPage
