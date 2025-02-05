"use client"; // mark this file as a client component

import { useEffect } from "react";
import { fetchDatafromApi } from "@/utils/page";
import { getApiConfiguration, getGenres } from "@/store/Homeslice";
import { useDispatch } from "react-redux";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import Homepage from "./home/page";

// import dynamic from "next/dynamic";

// const Header = dynamic(() => import("@/components/header/page"), {
//   ssr: false,
// });

// const Homepage = dynamic(() => import("@/pages/home/page"), { ssr: false });
// const Searchresult = dynamic(() => import("@/pages/searchresult/page"), {
//   ssr: false,
// });
// // const Explore = dynamic(() => import("@/pages/explore/page"), { ssr: false });
// const Details = dynamic(() => import("@/pages/details/[mediaType]/[id]/page"), {
//   ssr: false,
// });

// const Footer = dynamic(() => import("@/components/footer/page"), {
//   ssr: false,
// });

const Home = () => {
  const dispatch = useDispatch();

  // Fetch API configuration and genres on client-side
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
