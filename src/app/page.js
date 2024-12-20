"use client";
import { useEffect } from "react";
import { fetchDatafromApi } from "@/utils/page";
import { getApiConfiguration, getGenres } from "@/store/Homeslice";
import { useDispatch, useSelector } from "react-redux";
import Homepage from "@/pages/home/page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Details from "@/pages/details/page";
import Searchresult from "@/pages/searchresult/page";
import Explore from "@/pages/explore/page";
const Home = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    fetchapiconfig();
    generesCall();
  }, []);

  const fetchapiconfig = () => {
    fetchDatafromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const generesCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDatafromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      console.log(genres);
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<Searchresult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
};

export default Home;
