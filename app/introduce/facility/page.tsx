import React from "react";
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const Breadcrumb = () => {
  return (
    <nav className="container mx-auto px-4 py-5 bg-white">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4" />
        </li>
        <li>
          {/* Assuming a parent page exists, otherwise this can be text */}
          <span className="font-medium text-gray-500">Giới thiệu</span>
        </li>
        <li>
          <ChevronRight className="w-4 h-4" />
        </li>
        <li className="font-medium text-primary">Cơ sở vật chất</li>
      </ol>
    </nav>
  )
}

const FacilityPage = () => {
  return (
    <div className="bg-white text-gray-800">
      <Breadcrumb />
      {/* Hero Section */}
      <section className="flex-1 bg-green-50 pt-12 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-green-800 mb-4 text-center md:text-3xl">
            Cơ sở vật chất
          </h1>
          <p className="text-lg md:text-base text-black-700 max-w-8xl mx-auto text-justify leading-relaxed">
            Cơ sở vật chất nhà trường được đầu tư hiện đại
          </p>
        </div>
      </section>
    </div>
  );
};

export default FacilityPage;