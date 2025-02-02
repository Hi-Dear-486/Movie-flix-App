"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/page";
import { useSelector } from "react-redux";
import Img from "@/components/lazyloadimage/page";
import ContentWrapper from "@/components/contentwrapper/page";
import "./style.scss";

const Herobanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data, url.backdrop]);
  const searchqueryhandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
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
                onKeyUp={searchqueryhandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button>Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default Herobanner;
