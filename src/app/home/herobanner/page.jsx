"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/page";
import { useSelector } from "react-redux";
import Img from "@/components/lazyloadimage/page";
import ContentWrapper from "@/components/contentwrapper/page";
import "./style.scss";
import Trending from "../trending/page";
import Popular from "../popular/page";
import TopRated from "../topRated/page";

const Herobanner = () => {
  const [background, setBackground] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data, url.backdrop]);

  return (
    <div>
      <div className="herobanner">
        {!loading && (
          <div className="backdrop-img">
            <Img src={background} />
          </div>
        )}

        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="herobannercontent">
            <span className="title">Welcome.</span>
            <span className="subtitle">
              Millions of movies, TV show and people to discover. Explore now
            </span>
            <div className="searchinput">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
      <Trending searchTerm={searchTerm} />
      <Popular searchTerm={searchTerm} />
      <TopRated searchTerm={searchTerm} />
    </div>
  );
};

export default Herobanner;
