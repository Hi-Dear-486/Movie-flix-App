"use client";
import Carousel from "@/components/carousel/page";
import ContentWrapper from "@/components/contentwrapper/page";
import Switchtab from "@/components/switchtab/page";
import useFetch from "@/hooks/page";
import React, { useState } from "react";

const Popular = ({ searchTerm }) => {
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

      <Carousel
        data={data?.results}
        loading={loading}
        endpoint={endpoint}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Popular;
