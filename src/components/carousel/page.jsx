import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentwrapper/page";
import Img from "../lazyloadimage/page";
import PosterFallback from "../../../public/assets/avatar.png";
import CircleRating from "../circleRating/page";
import Genres from "../genres/page";
import "./style.scss";
import Link from "next/link";

const Carousel = ({ data, loading, endpoint, title, searchTerm }) => {
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
  // 🔥 Filter logic: Sirf wo items jo searchTerm se match karein
  const filteredData = data?.filter((item) =>
    (item.title || item.name).toLowerCase().includes(searchTerm?.toLowerCase())
  );

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
            {filteredData?.length > 0 ? (
              filteredData.map((item) => {
                const posterUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallback;

                return (
                  <Link
                    key={item.id}
                    className="carouselItem"
                    href={`/home/details/${item.media_type || endpoint}/${
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

export default Carousel;
