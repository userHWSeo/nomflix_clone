import { useQuery } from "react-query";
import { useLocation } from "react-router";
import styled from "styled-components";
import { searchMovie } from "../api";
import { ISearchMovieResult } from "../api";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-top: 100px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 300px;
  height: 200px;
  cursor: pointer;
  margin: 20px 20px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<ISearchMovieResult>(
    ["movies", "nowPlaying"],
    async () => searchMovie(keyword)
  );
  console.log(data);
  const poster = data?.results.map((props: any) => props.poster_path);
  return (
    <List>
      {!isLoading
        ? poster.map((props: any) => <Box bgphoto={makeImagePath(props)} />)
        : null}
    </List>
  );
}

export default Search;
