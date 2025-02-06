"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import useFetch from "@/hooks/page";
import DetailsBanner from "@/app/details/detailsBanner/page";
import Cast from "@/app/details/cast/page";
import VideosSection from "@/app/details/videosection/page";
import Similar from "@/app/details/similar/page";
import Recommendation from "@/app/details/recommend/page";

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
      <Similar mediaType={mediaType} id={id} title="Similar Movies" />
      <Recommendation mediaType={mediaType} id={id} title="Recommendations" />
    </div>
  );
};

export default Details;
