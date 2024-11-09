'use client'
import { HimsMessage } from "@/components/HimsMessage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ShineyButton } from "@/components/ShineyButton";
import HeadingText from "@/components/heading-text";
import { Icons } from "@/components/icons";
import MockHIMSUi from "@/components/mock-HIMS-ui";
import { AnimatedList } from "@/components/ui/animated-list";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/*
const ListOfPainPoints = [
  "Running out of stock frequently",
  "Inaccurate inventory counts",
  "Time-consuming manual updates",
  "Difficulty forecasting demand",
  "Lack of sales insights",
]; */


const ListOfSolutions = [
  "Real-time stock alerts",
  "Accurate, automated tracking",
  "Streamlined inventory management",
  "Data-driven demand forecasting",
  "Detailed sales analytics",
];

export default function Home() {

  /*
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PRO",
      email: "zoe.martinez2001@email.com",
      amount: 49.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
  }
})`*/
  return (
    <>
      <section>
        <MaxWidthWrapper className="flex flex-col items-center justify-center text-center mt-28 mb-28 sm:mt-40">
          <div className="mx-auto max-w-fit mb-4 flex items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
            <p className="text-sm font-semibold text-gray-700">📢 <span className="text-blue-600 font-mono">HIMS</span> is now public! Try it today</p>
          </div>
          <HeadingText>
            Manage Your <span className="text-blue-600 font-mono">Inventory</span> with Ease and Speed.
          </HeadingText>

          <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
            HIMS simplifies your inventory management so you can focus on growing your business.
          </p>
          {/**   <Link href='/auth/signin' className={buttonVariants({
            size: "lg",
            className: "mt-5"
          })}>
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>*/}
          <div>
            <ul className="space-y-2 mt-3 text-base/7 text-gray-600 text-left flex flex-col items-start">
              {ListOfSolutions.map((solution, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <Check className="size-5 shrink-0 text-blue-700" />
                  {solution}</li>
              ))}
            </ul>
          </div>
          <div className="w-full mt-5 max-w-80">
            <ShineyButton
              href="/sign-up"
              className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >Manage My Inventory</ShineyButton>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="relative pb-4">
        <div className="absolute inset-x-0 bottom-24 top-24 bg-blue-700" />
        <div className="relative mx-auto">
          <MaxWidthWrapper className="relative">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:m-4 lg:rounded-2xl lg-p-4">
              <MockHIMSUi>
                <AnimatedList>
                  <HimsMessage
                    avatarSrc={"/images/brand-asset-profile-picture.png"}
                    avatarAlt={"image"}
                    username={"HIMS"}
                    timestamp={"Today at 12:35PM"}
                    badgeText={"SignUp"}
                    badgeColor={"#43b581"}
                    title={"👤 New User Signed up"}
                    content={{
                      name: "Bemnet Beyene",
                      email: "bem@gmail.com"
                    }} />
                  <HimsMessage
                    avatarSrc="/images/brand-asset-profile-picture.png"
                    avatarAlt="HIMS Avatar"
                    username="HIMS"
                    timestamp="Today at 12:35PM"
                    badgeText="Revenue"
                    badgeColor="#faa61a"
                    title="💰 Payment received"
                    content={{
                      amount: "$49.00",
                      email: "zoe.martinez2001@email.com",
                      plan: "PRO",
                    }} />
                  <HimsMessage
                    avatarSrc="/images/brand-asset-profile-picture.png"
                    avatarAlt="HIMS Avatar"
                    username="HIMS"
                    timestamp="Today at 5:11AM"
                    badgeText="Milestone"
                    badgeColor="#5865f2"
                    title="🚀 Revenue Milestone Achieved"
                    content={{
                      recurringRevenue: "$5.000 USD",
                      growth: "+8.2%",
                    }} />
                </AnimatedList>
              </MockHIMSUi>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
      <section className="relative py-24 sm:py-32 bg-blue-50">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base font-semibold text-blue-600">
              Efficient Inventory Management
            </h2>
            <HeadingText className="text-center">Optimize, Track, and Grow with Real-Time Insights</HeadingText>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* Real-time Stock Monitoring */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />

              <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-l-2xl shadow-lg">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="text-lg font-medium tracking-tight text-blue-950">
                    Real-time Stock Monitoring
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Stay updated on stock levels and get alerts for low inventory, so you're never out of stock.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-xl bg-gray-900 shadow-2xl">
                    <Image
                      className="object-cover object-top"
                      src="/images/phone-screen.png"
                      alt="Inventory monitoring interface"
                      fill
                    />
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-2xl" />
            </div>

            {/* Order Tracking */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-2xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-lg shadow-lg max-lg:rounded-t-2xl">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="text-lg font-medium tracking-tight text-blue-950">
                    Order Tracking
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Track orders, fulfillments, and shipments in real-time to keep operations smooth and customers happy.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 sm:px-10 lg:pb-2">
                  <Image
                    className="w-full max-lg:max-w-xs"
                    src="/images/bento-any-event.png"
                    alt="Order tracking interface"
                    width={500}
                    height={300}
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-2xl" />
            </div>

            {/* Custom Data & Insights */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="text-lg font-medium tracking-tight text-blue-950">
                    Custom Data & Insights
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Add custom attributes to transactions and get insights that help you plan and forecast with precision.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 sm:px-10 lg:pb-2">
                  <Image
                    className="w-full max-lg:max-w-xs"
                    src="/images/bento-custom-data.png"
                    alt="Data insights interface"
                    width={500}
                    height={300}
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
            </div>

            {/* Seamless Integration */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-2xl lg:rounded-r-2xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-lg shadow-lg max-lg:rounded-b-2xl lg:rounded-r-2xl">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="text-lg font-medium tracking-tight text-blue-950">
                    Seamless Integration
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Integrate our solution with your existing systems and access API documentation for easy setup.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="border-b border-r border-white/20 bg-white/5 px-4 py-2 text-white">
                        inventory-api.js
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-2xl lg:rounded-r-2xl" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="relative py-24 sm:py-32 bg-white">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div>
            <h2 className="text-center text-base/7 font-semibold text-blue-600">
              Real-World Experiences
            </h2>
            <HeadingText className="text-center">What our customers say</HeadingText>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {/* first customer review */}
            <div className="flex flex-auto flex-col gap-4 bg-blue-50 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-blue-600 fill-blue-600" />
                <Star className="size-5 text-blue-600 fill-blue-600" />
                <Star className="size-5 text-blue-600 fill-blue-600" />
                <Star className="size-5 text-blue-600 fill-blue-600" />
                <Star className="size-5 text-blue-600 fill-blue-600" />
              </div>

              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-blue-950 text-center lg:text-left text-pretty">
                PingPanda has been a game-changer for me. I've been using it for
                two months now and seeing sales pop up in real-time is super
                satisfying.
              </p>

              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/images/user-2.png"
                  className="rounded-full object-cover"
                  alt="Random user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Freya Larsson
                    <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">@itsfreya</p>
                </div>
              </div>
            </div>

            {/* second customer review */}
            <div className="flex flex-auto flex-col gap-4 bg-blue-100 p-6 sm:p-8 lg:p-16 rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-blue-600 fill-blue-600" />
                <Star className="size-5 text-blue-600 fill-blue-600" />
                <Star className="size-5 text-blue-600 fill-blue-600" />
                <Star className="size-5 text-blue-600 fill-blue-600" />
                <Star className="size-5 text-blue-600 fill-blue-600" />
              </div>

              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-blue-950 text-center lg:text-left text-pretty">
                PingPanda's been paying off for our SaaS. Nice to have simple
                way to see how we're doing day-to-day. Definitely makes our
                lives easier.
              </p>

              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/images/user-1.png"
                  className="rounded-full object-cover"
                  alt="Random user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Kai Durant
                    <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">@kdurant_</p>
                </div>
              </div>
            </div>
          </div>

          <ShineyButton
            href="sign-in"
            className="relative z-10 h-14 w-full max-w-xs text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            Start For Free Today
          </ShineyButton>
        </MaxWidthWrapper>
      </section>

      <div>
        <div className="relative isolate">
          <div aria-hidden='true' className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>
          {/**
           *    <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src='/images/dashboard1.png'
                    alt="dashboard image"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 lg:p-20 shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
             <div aria-hidden='true' className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[32.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]" />
          </div>
           */}


        </div>
      </div>
      {/**<section className="mx-auto my-32 max-w-5xl">
        <MaxWidthWrapper className="flex justify-between items-center">
          <div>
            <div className="text-left pb-5">
              <HeadingText>
                <span className="text-blue-600">Struggling</span> with Inventory?
              </HeadingText>
              <p className="text-lg text-gray-600">We know the common issues holding you back:</p>
            </div>
            <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start">
              {ListOfPainPoints.map((painpoint, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <X className="size-5 shrink-0 text-red-700" />
                  {painpoint}</li>
              ))}
            </ul>
          </div>

          <div className="border border-r-2 border-blue-700 h-96"></div>
 
          <div className="flex flex-col items-center justify-center">
            <div className="text-center pb-5">
              <HeadingText>
                Why Choose
                {' '} <span className="text-blue-600">HIMS</span>?
              </HeadingText>
              <p className="text-lg text-gray-600">Common challenges solved with HIMS</p>
            </div>
            <div>
              <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start">
                {ListOfSolutions.map((solution, index) => (
                  <li key={index} className="flex gap-1.5 items-center text-left">
                    <Check className="size-5 shrink-0 text-blue-700" />
                    {solution}</li>
                ))}
              </ul>
            </div>

          </div>
        </MaxWidthWrapper>
      </section> */}

      {/** 
       * <section className="mx-auto my-32 max-w-full px-6">
        <MaxWidthWrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  
          <div className="flex flex-col items-start">
            <div className="text-left pb-5">
              <HeadingText>
                <span className="text-blue-600">Struggling</span> with Inventory?
              </HeadingText>
              <p className="text-lg text-gray-700">We know the common issues holding you back:</p>
            </div>
            <ul className="space-y-4 text-base text-gray-600">
              {ListOfPainPoints.map((painpoint, index) => (
                <li key={index} className="flex items-center gap-3">
                  <X className="w-5 h-5 text-red-700" />
                  <span>{painpoint}</span>
                </li>
              ))}
            </ul>
          </div>


          <div className="hidden lg:flex items-center justify-center">
            <div className="border-r-2 h-3/4 border-gray-300"></div>
          </div>


          <div className="flex flex-col items-start lg:items-center">
            <div className="text-left lg:text-center pb-5">
              <HeadingText>
                Why Choose <span className="text-blue-600">HIMS</span>?
              </HeadingText>
              <p className="text-lg text-gray-700">Common challenges solved with HIMS</p>
            </div>
            <ul className="space-y-4 text-base text-gray-600">
              {ListOfSolutions.map((solution, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-700" />
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </MaxWidthWrapper>
      </section>
      */}


      {/** Feature Section <AboutUs />
        */}
      <div className="mx-auto my-32 max-w-5xl">
        {/** Steps */}
        <div className="mb-12 px-5 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <HeadingText className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">Get <span className="text-blue-600 font-mono">Started</span> in Just Minutes</HeadingText>
            <p className="mt-4 text-lg text-gray-600">
              With HIMS, managing inventory is simple, fast, and effortless.
            </p>
          </div>
        </div>
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-y-0 md:space-x-12">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="text-xl font-semibold">Sign Up Easily</span>
              <span className="mt-2 text-zinc-700">Join HIMS for free or go premium with our <Link href='/pricing' className="text-blue-700 underline underline-offset-2">Pro Plan</Link>.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="text-xl font-semibold">Add Products Instantly</span>
              <span className="mt-2 text-zinc-700">Simply list your products to set up your inventory in no time.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="text-xl font-semibold">Start Tracking Sales</span>
              <span className="mt-2 text-zinc-700">Manage sales in real-time. HIMS is built to save you time and effort.
              </span>
            </div>
          </li>
        </ol>
        {/**
 *  <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src='/images/dashboard2.jpg'
                  alt="dashboard image"
                  width={1419}
                  height={732}
                  quality={100}
                  className="rounded-md bg-white p-2 sm:p-8 lg:p-20 shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
*/}

      </div>
    </>
  );
}
