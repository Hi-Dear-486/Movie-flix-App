// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import InfiniteScroll from "react-infinite-scroll-component";
// import "./style.scss";
// import { fetchDatafromApi } from "@/utils/page";
// import ContentWrapper from "@/components/contentwrapper/page";
// import Spinner from "@/components/spinner/page";
// import MovieCard from "@/components/Moviecard/page";
// import noResults from "../../../public/assets/no-results.png";

// const Searchresult = () => {
//   const [data, setData] = useState(null);
//   const [pageNum, setPageNum] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const { query } = useParams();

//   const fetchIntialData = () => {
//     setLoading(true);
//     fetchDatafromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
//       (res) => {
//         setData(res);
//         setPageNum((prev) => prev + 1);
//         setLoading(false);
//       }
//     );
//   };

//   const fetchNextpageData = () => {
//     fetchDatafromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
//       (res) => {
//         if (data?.results) {
//           setData({
//             ...data,
//             results: [...data?.results, ...res.results],
//           });
//         } else {
//           setData(res);
//         }
//         setPageNum((prev) => prev + 1);
//       }
//     );
//   };

//   useEffect(() => {
//     fetchIntialData;
//   }, [query]);

//   return (
//     <div className="searchResultsPage">
//       {loading && <Spinner initial={true} />}
//       {!loading && (
//         <ContentWrapper>
//           {data?.results?.length > 0 ? (
//             <>
//               <div className="pageTitle">
//                 {`Search ${
//                   data?.total_results > 1 ? "results" : "result"
//                 } of '${query}'`}
//               </div>
//               <InfiniteScroll
//                 className="content"
//                 dataLength={data?.results?.length || []}
//                 next={fetchNextpageData}
//                 hasMore={pageNum <= data?.total_results_pages}
//                 loader={<Spinner />}
//               >
//                 {data?.results.map((item, index) => {
//                   if (item.media_type === "person") return;
//                   return (
//                     <MovieCard key={index} data={item} fromSearch={true} />
//                   );
//                 })}
//               </InfiniteScroll>
//             </>
//           ) : (
//             <span className="resultNotFound">Sorry, results not found!</span>
//           )}
//         </ContentWrapper>
//       )}
//     </div>
//   );
// };

// export default Searchresult;

const Searchresult = () => {
  return (
    <div>
      <p></p>
    </div>
  );
};

export default Searchresult;
