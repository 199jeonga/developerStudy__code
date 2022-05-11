import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const [moviewDetail, setMovieDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovieDetail(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>{moviewDetail.title}</h2>
          <img src={moviewDetail.large_cover_image} alt={moviewDetail.title} />
          <div>
            <em>개봉연도 : {moviewDetail.year}</em>
            <p>개봉월일 : {moviewDetail.rating}</p>
            <p>상영시간 : {moviewDetail.runtime}</p>
            <ul>
              {moviewDetail.genres.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
