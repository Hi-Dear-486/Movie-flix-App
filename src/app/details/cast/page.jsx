"use client";
import "./style.scss";
import ContentWrapper from "@/components/contentwrapper/page";
import Img from "@/components/lazyloadimage/page";

const Cast = ({ data, loading, profileUrl }) => {
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => {
              let imgurl = item.profile_path
                ? profileUrl + item.profile_path
                : "/assets/avatar.png";

              return (
                <div key={item.id} className="listItem">
                  <div className="profileImg">
                    <Img src={imgurl} />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="character">{item.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
