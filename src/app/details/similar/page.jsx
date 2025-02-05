"use client";
import Carousel from "@/components/carousel/page";
import useFetch from "@/hooks/page";
import dynamic from "next/dynamic";

// Dynamically import the component and disable SSR
// const Carousel = dynamic(() => import("@/components/carousel/page"), {
//   ssr: false,
// });
// const useFetch = dynamic(() => import("@/hooks/page"), { ssr: false });

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
