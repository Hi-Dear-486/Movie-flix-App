"use client";
import React, { useState } from "react";
import ContentWrapper from "@/components/contentwrapper/page";
import Switchtab from "@/components/switchtab/page";
import Carousel from "@/components/carousel/page";
import useFetch from "@/hooks/page";
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

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <Switchtab data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
