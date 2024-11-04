import { CheckCircle, TrendingUp, Users, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function AboutHIMS() {
  return (
    <div className="mx-auto max-w-5xl mt-16 sm:mt-24 mb-16 px-6 lg:px-8 text-center">
      {/* Brief Introduction */}
      <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">About HIMS</h2>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
        HIMS (Holistic Inventory Management System) is your all-in-one solution for smart, efficient, and effortless inventory management.
      </p>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="p-6 rounded-lg shadow-lg bg-white text-center">
          <CheckCircle className="mx-auto mb-4 h-8 w-8 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Smart Tracking</h3>
        </div>

        <div className="p-6 rounded-lg shadow-lg bg-white text-center">
          <TrendingUp className="mx-auto mb-4 h-8 w-8 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-800">Data Insights</h3>
        </div>

        <div className="p-6 rounded-lg shadow-lg bg-white text-center">
          <Users className="mx-auto mb-4 h-8 w-8 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-800">Team Collaboration</h3>
        </div>

        <div className="p-6 rounded-lg shadow-lg bg-white text-center">
          <Globe className="mx-auto mb-4 h-8 w-8 text-yellow-500" />
          <h3 className="text-xl font-semibold text-gray-800">Anywhere Access</h3>
        </div>
      </div>

      {/* CTA */}
      <h3 className="text-3xl font-bold text-blue-600 sm:text-4xl mb-4">Join the HIMS Community</h3>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
        Start a free trial and see how HIMS transforms your inventory management.
      </p>
      <Link href='/auth/signin' className={buttonVariants({
        size: "lg",
        className: "inline-flex items-center"
      })}>
        Get Started <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
}
