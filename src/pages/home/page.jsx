import React from "react";
import Herobanner from "./herobanner/page";
import "./style.scss";
import Trending from "./trending/page";
import Popular from "./popular/page";
import TopRated from "./topRated/page";
const Homepage = () => {
  return (
    <div>
      <Herobanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Homepage;
