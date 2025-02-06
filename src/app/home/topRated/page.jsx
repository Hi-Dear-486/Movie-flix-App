"use client";
import React, { useState } from "react";
import ContentWrapper from "@/components/contentwrapper/page";
import Switchtab from "@/components/switchtab/page";
import Carousel from "@/components/carousel/page";
import useFetch from "@/hooks/page";

const TopRated = ({ searchTerm }) => {
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

      <Carousel
        data={data?.results}
        loading={loading}
        endpoint={endpoint}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default TopRated;
