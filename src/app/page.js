"use client";

import { useEffect } from "react";
import { fetchDatafromApi } from "@/utils/page";
import { getApiConfiguration, getGenres } from "@/store/Homeslice";
import { useDispatch } from "react-redux";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Homepage from "./home/page";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const apiConfigRes = await fetchDatafromApi("/configuration");
      const apiConfig = {
        backdrop: apiConfigRes.images.secure_base_url + "original",
        poster: apiConfigRes.images.secure_base_url + "original",
        profile: apiConfigRes.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(apiConfig));

      const genresRes = await Promise.all(
        ["tv", "movie"].map((url) => fetchDatafromApi(`/genre/${url}/list`))
      );

      let allGenres = {};
      genresRes.forEach(({ genres }) => {
        genres.forEach((item) => {
          allGenres[item.id] = item;
        });
      });

      dispatch(getGenres(allGenres));
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main>
        <Homepage />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
