"use client";
// import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import useFetch from "@/hooks/page";
import DetailsBanner from "@/app/details/detailsBanner/page";
import Cast from "@/app/details/cast/page";
import VideosSection from "@/app/details/videosection/page";
import Similar from "@/app/details/similar/page";
import Recommendation from "@/app/details/recommend/page";

// import DetailsBanner from "../../detailsBanner/page";
// import Cast from "../../cast/page";
// import VideosSection from "../../videosection/page";
// import Similar from "../../similar/page";
// import Recommendation from "../../recommend/page";

// const useFetch = dynamic(() => import("@/hooks/page"), { ssr: false });
// const DetailsBanner = dynamic(
//   () => import("@/pages/details/detailsBanner/page"),
//   {
//     ssr: false,
//   }
// );
// const VideosSection = dynamic(
//   () => import("@/pages/details/videosection/page"),
//   {
//     ssr: false,
//   }
// );
// const Recommendation = dynamic(() => import("@/pages/details/recommend/page"), {
//   ssr: false,
// });
// const Cast = dynamic(() => import("@/pages/details/cast/page"), { ssr: false });
// const Similar = dynamic(() => import("@/pages/details/similar/page"), {
//   ssr: false,
// });

const Details = () => {
  const url = useSelector((state) => state?.home?.url) || {};

  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(
    mediaType && id ? `/${mediaType}/${id}/videos` : null
  );
  const { data: credits, loading: creditsLoading } = useFetch(
    mediaType && id ? `/${mediaType}/${id}/credits` : null
  );

  if (!mediaType || !id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast
        data={credits?.cast}
        loading={creditsLoading}
        profileUrl={url?.profile}
      />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
