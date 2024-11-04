"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import HeadingText from "@/components/heading-text"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()

  const INCLUDED_FEATURES = [
    "Real-time stock updates",
    "Comprehensive product management",
    "Sales and purchase tracking",
    "Detailed analytics and reporting",
    "Priority customer support",
  ]

  return (
    <div className="bg-blue-50 py-20 sm:py-20">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl sm:text-center">
          <HeadingText className="text-center">Simple and Transparent Pricing</HeadingText>
          <p className="mt-6 text-base/7 text-gray-600 max-w-prose text-center">
            No hidden fees, no surprises. Get full access to our inventory management system for a one-time payment.
          </p>
        </div>

        <div className="bg-white mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-16 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-3xl font-heading font-semibold tracking-tight text-gray-900">
              Lifetime Access
            </h3>

            <p className="mt-6 text-base/7 text-gray-600">
              Make a one-time investment in our system and streamline your inventory management forever.
              Enjoy real-time tracking, insightful analytics, and robust reporting—all at your fingertips.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              {INCLUDED_FEATURES.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <CheckIcon className="h-6 w-5 flex-none text-blue-700" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs py-8">
                <p className="text-base font-semibold text-gray-600">
                  Pay once, own forever
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $99
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    USD
                  </span>
                </p>

                <Button onClick={() => { }} className="mt-6 px-20">
                  Get Started
                </Button>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Secure payment. Start managing your inventory in minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
