"use client";

import Carousel from "@/components/carousel/page";
import useFetch from "@/hooks/page";
import dynamic from "next/dynamic";

// const Carousel = dynamic(() => import("@/components/carousel/page"), {
//   ssr: false,
// });

// const useFetch = dynamic(() => import("@/hooks/page"), { ssr: false });

const Recommendation = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <Carousel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;
