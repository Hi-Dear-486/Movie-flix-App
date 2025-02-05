"use client";
import Carousel from "@/components/carousel/page";
import ContentWrapper from "@/components/contentwrapper/page";
import Switchtab from "@/components/switchtab/page";
import useFetch from "@/hooks/page";
import React, { useState } from "react";
// import dynamic from "next/dynamic";

// const ContentWrapper = dynamic(
//   () => import("@/components/contentwrapper/page"),
//   {
//     ssr: false,
//   }
// );
// const Switchtab = dynamic(() => import("@/components/switchtab/page"), {
//   ssr: false,
// });
// const useFetch = dynamic(() => import("@/hooks/page"), {
//   ssr: false,
// });
// const Carousel = dynamic(() => import("@/components/carousel/page"), {
//   ssr: false,
// });

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What&apos;s Popular</span>
        <Switchtab data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
