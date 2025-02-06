"use client";
import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import Link from "next/link";
import ContentWrapper from "@/components/contentwrapper/page";
import Img from "@/components/lazyloadimage/page";
import PosterFallback from "../../../../public/assets/avatar.png";
import CircleRating from "@/components/circleRating/page";
import Genres from "@/components/genres/page";
import useFetch from "@/hooks/page";

const Similar = ({ mediaType, id, title }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
  const carouselContainer = useRef();

  const { url } = useSelector((state) => state.home);

  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className=" skeleton posterBlock"></div>
        <div className=" skeleton textBlock">
          <div className=" skeleton title"></div>
          <div className=" skeleton date"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />

        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.results?.length > 0 ? (
              data?.results?.map((item) => {
                const posterUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallback;
                return (
                  <Link
                    key={item.id}
                    className="carouselItem"
                    href={`/home/details/${item.media_type || "movie"}/${
                      item.id
                    }`}
                  >
                    <div className="posterBlock">
                      <Img src={posterUrl} />
                      <CircleRating
                        rating={(item.vote_average || 0).toFixed(1)}
                      />
                      <Genres data={(item.genre_ids || []).slice(0, 2)} />
                    </div>
                    <div className="textBlock">
                      <span className="title">{item.title || item.name}</span>
                      <span className="date">
                        {dayjs(item.release_Date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="noResults">No results found</p>
            )}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Similar;
