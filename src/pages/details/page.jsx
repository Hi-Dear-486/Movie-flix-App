import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import useFetch from "@/hooks/page";
import DetailsBanner from "./detailsBanner/page";
import Cast from "./cast/page";
import VideosSection from "./videosection/page";
import Similar from "./similar/page";
import Recommendation from "./recommend/page";
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />;
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
