# React Master Class

### 노마드코더 강의 내용 정리 및 복습을 위한 README 입니다.

<br>
<br>
<br>
<br>

### 220517

<br>
본격적인 Netflix 클론 코딩을 시작했다.
<br>
먼저 기존 package 세팅과 Theme 세팅은 그대로 가져왔다.
<br>
(recoil, styled-components, farmer-motion 등등)
<br>
<br>
이후 Components 폴더와 Routes 폴더를 생성하였고 간단한 NavBar를 먼저 만들었다.
<br>
<br>
NavBar에 Home, Search, Tv 총 세 개의 Router를 넣어 주고 Header.tsx 파일로 꾸며주었다.
<br>
<br>

Header의 기본적인 CSS 작업을 하였고 Netflix svg에 Hover 효과를 집어 넣었다.

```
...

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {

    // 배열을 사용하여 순차적인 효과를 낼 수 있다.
    // fillOpacity를 0, 1, 0 을 넣어 깜빡거리는 효과를 냈다.
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

...

    <Logo

        // variants를 적용했다.
        variants={logoVariants}
        initial="normal"
        whileHover="active"
        xmlns="http://www.w3.org/2000/svg"
        height="276.742"
        viewBox="0 0 1024 276.742"
    >
    </Logo>

...

```

<br>
<br>
다음으로 useMatch를 사용하여 현재 있는 URL 주소의 URL Object 혹은 null 을 반환해준다.
<br>
<br>
반환 이후 이걸 사용해 작은 Circle로 현재 위치를 NavBar에 나타나게 하도록 했다.

```
...

function Header() {

    // 현재 위치가 Home 혹은 TV router에 위치하는지 반환 해준다.
  const homeMatch = useMatch("");
  const tvMatch = useMatch("tv");
  console.log(homeMatch, tvMatch);
  return (
    <Nav>
      <Col>
      ...
        <Items>
          <Item>
          // 만약 URL 위치가 Home(혹은 Tv Show)에 위치해 있다면 Circle을 표시.
            <Link to="">Home {homeMatch && <Circle />}</Link>
          </Item>
          <Item>
            <Link to="tv">Tv Shows {tvMatch && <Circle />}</Link>
          </Item>
        </Items>
      </Col>

      ...

```

<br>
<br>
<br>
<br>

### 220518

<br>
저번 Header에 이어서 Search Animation과 Scroll Animation을 추가로 넣었다.
<br>
<br>
먼저 toggle을 이용하여 아이콘을 클릭 했을 때 Input이 열리고 다시 눌렀 떄 닫히도록 구현했다.
<br>

```
function Header() {

  // useState를 사용한 상태 변환
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("");
  const tvMatch = useMatch("tv");
  const toggleSearch = () => {

    // 만약 Input이 열려있으면 클릭 시 닫히도록
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });

    // 아니라면 클릭 시 Input을 열도록
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    // 열고 닫을 수 있게 클릭 시 true를 false로 false를 true로 변환
    setSearchOpen((prev) => !prev);
  };
  return (

...

        <Search>
          <motion.svg

            // Search 아이콘에 toggleSearch 넣는다.
            onClick={toggleSearch}

            // 열려 있는 상태라면 아이콘은 x축으로 -215 만큼 민다.
            animate={{ x: searchOpen ? -215 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
          </motion.svg>
          <Input
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for movie or tv show..."
          />
        </Search>
      </Col>
    </Nav>
  );
}
```

<br>
<br>
다음으론 스크롤을 내릴 때 navBar에 색상이 변하는 효과를 주었다.
<br>
useAnimation를 사용하여 시작과 중지가 가능한 애니메이션을 만들었다.
<br>
또한 useViewportScroll을 사용하여 Y축 스크롤에 따른 애니메이션 효과를 주었다.

```
...

// navVar의 변수를 만들어 주었다.
const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

function Header() {

  // input과 navBar에 useAnimation를 사용했다.
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();

  // Y축 스크롤에 useViewportScroll을 사용하여 효과를 주었다.
  const { scrollY } = useViewportScroll();

  ...

  // useEffect를 사용하여 렌더링 될 때 실행되도록 한다.
  useEffect(() => {

    // Y축이 변화 될때
    scrollY.onChange(() => {

      // 만약 scrollY가 80보다 크다면 배경을 검은색으로
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      }

      // 그렇지 않다면 투명한 색으로
      else {
        navAnimation.start("top");
      }
    });

    // Y축 스크롤과 navAnimation이 변할 때 마다 실행
  }, [scrollY, navAnimation]);
  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Items>
          <Item>

            // Circle에 layoutId를 주어 Circle에 움직임을 줬다.
            <Link to="">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="tv">
              Tv Shows {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>

      ...

}
```

<br>
<br>
<br>
<br>

### 220519

<br>
본격적으로 영화 API를 활용한 Home을 제작했다.
<br>
<br>
https://developers.themoviedb.org/3/movies/get-now-playing 👈 TheMovieDB API 주소
<br>
<br>
api.ts 파일을 만들어 따로 API를 관리하여 준다.
<br>

```

// 오픈 API 소스라 딱히 암호화 할 필요는 없다.
const API_KEY = "32ed9f0c14142254ed7a8d82aaeef5ae";

// 기본 URL 주소를 만들었다.
const BASE_PATH = "https://api.themoviedb.org/3";

// fetch를 사용하여 API를 JSON으로 가져온다.
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
```

<br>
<br>
다음 useQuery를 사용하여 data를 가져온다.
<br>
useQuery를 사용하기 전 index.tsx 파일에 QueryClient와 QueryClientProvider를 사용한다.

```

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

```

<br>
<br>
그리고 Home.tsx 파일에 useQuery를 사용하여 json파일을 확인한다.

```

import { useQuery } from "react-query";
import { getMovies } from "../api";

function Home() {

  // console.log를 사용하여 data(jsonObject)와 isLoading을 확인한다.
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  return (
    <div style={{ backgroundColor: "whitesmoke", height: "200vh" }}>home</div>
  );
}
export default Home;

```

<br>
<br>
json파일을 확인했다면 API에서 필요한 요소들을 가져갈 차례이다.
<br>
먼저 api.ts 파일에 API의 타입을 정해준다.
<br>

```
// result의 요소들의 타입을 정함
interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

// api의 타입을 정함
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
```

<br>
<br>
위와 같이 타입을 정했다면 사용할 차례다.

```
function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  console.log(data);
  return (
    <Wrapper>
    // isLoading이 false일 때 Title과 Overview를 나타낸다.
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        // <></> (fragment)를 활용한다.
        <>
        // data.result의 첫 번째 요소 title과 overview를 가져온다.
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}

```

<br>
<br>
fragment는 처음 알았는데 검색해보니 부모가 없는 최소화로 경량화된 문서 객체라고 한다.
<br>
의미없는 div를 사용하지 않기 위해서 쓴다고 한다.
<br>
<br>
이렇게 title과 overview를 가져오는데 성공하였고 다음으론 이미지를 가져올 차례이다.
<br>
이미지는 utils.ts파일을 만들어 관리하였다.

```
// id와 format은 string인데 format은 undefined일 수 있기 때문에 ?를 붙인다.
export function makeImagePath(id: string, format?: string) {
  // 기본 URL을 적고 format이 true일 경우 format을 아닐 시 original을 반환한다.
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
```

<br>
<br>
마지막으로 Home.tsx 파일에 이미지를 넣어주면 된다.

```
// bgPhoto의 타입을 string으로 해준다.
const Banner = styled.div<{ bgPhoto: string }>`

...

  // linear-gradient로 그라데이션 효과를 주고 url에 props.bgPhoto를 넣어주어 이미지를 불러온다.
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

function Home() {

...

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>

        //makeImagePath를 가져오고 data.result의 첫번째 backdrop_path를 가져온다.
        // 또한 data가 정의되지 않을 수도 있다는 에러가 나오는데 fallback 만들어주기 위해 || ""을 사용한다.
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}
```

<br>
<br>
<br>
<br>

### 220522

<br>
추천 영화를 슬라이더로 볼 수 있도록 구현했다.
<br>
<br>

```
function Home() {

...

  // Row에 index를 넣어 넘어가는 효과를 준다.
  const [index, setIndex] = useState(0);

  // leaving을 만들어
  const [leaving, setLeaving] = useState(false);

  // toggleLeaving으로 setLeaving을 true에서 false로 false에서 true로 변환 시킨다.
  // 그래야지 클릭한 후에 다시 클릭을 할 수 있다.
  const toggleLeaving = () => setLeaving((prev) => !prev);

  // incraseIndex는 index를 증가시키기 위해 만들었다.
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;

      // 전체 영화 수에 offset(6개)를 나누어 maxIndex를 만들었다.
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      // 만일 maxIndex일 경우 prev는 0으로 돌아가고 아니면 하나 씩 넘어간다
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
          // Banner을 클릭하면 Index가 증가함
            onClick={incraseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  // slice(1)은 배경으로 사용된 영화를 제외하기 위해
                  .slice(1)
                  // 6개씩 쪼개어 슬라이드를 만들기 위해 아래와 같이 식을 사용함.
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    />
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}
```

<br>
<br>
그 다음으로 이미지를 배경으로 넣으면 된다.
<br>
배경은 util.ts 파일에 만들어 놓은 makeImagePath를 가져와 사용한다.

```

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;

  // background-image로 props 마다 각각의 배경을 준다.
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
`;


function Home() {

...

          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      // makeImagePath를 가져와 사용한다. 크기는 width500
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    />
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

...

```

<br>
<br>
<br>
<br>

### 220523

<br>
API로 가져온 영화 포스터들을 hover 시 영화의 scale 확대와 title(info)을 나타내도록 만들었다.
<br>
슬라이더의 양 끝 영화 포스터가 scale이 커질 때 잘려나오게 되어
<br>
first-child와 last-child의 transform-origin를 center left/right를 주었다.
<br>
그리고 info는 투명한 상태로 있다가 hover 시 opacity: 1로 주어 나타냈다.

```

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;

  // scale 시 슬리이더 양 끝 영화 포스터가 잘리지 않도록 함
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

// Info 라는 div를 만들어 hover 시 title을 나타내도록 함
const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

// hover 시 scale을 늘려 애니메이션 효과를 주었음
const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: { delay: 0.2, duration: 0.1, type: "tween" },
    y: -80,
  },
};

// hover 시 투명 상태의 info를 나타내도록 함
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duaration: 0.1,
      type: "tween",
    },
  },
};

function Home() {

...

                    <Box
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={BoxVariants}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >

                    // Info에 movie.title을 넣음
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>

 ...

```

<br>
<br>
<br>
<br>

### 220524

<br>
이젠 슬라이더에 있는 영화들을 클릭 시 확대가 되며 해당 영화의 자세한 설명을 나타내도록 한다.
<br>
제일 먼저 useNavigate를 사용하여 각 영화의 ID를 활용한 URI를 이동시켜야한다.
<br>
useNavigate는 Link와 비슷하게 페이지를 이동시켜주는 역활을 하는 훅인데
<br>
Link와 다른 점은 함수 호출을 통해 페이지를 이동하기 때문에 특정 조건이 충족 해야한다. 
<br>
Box를 클릭 시 해당 ID로 navigate를 이동시켜줬다.

```
 const navigate = useNavigate();
 const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  <Box
   onClick={() => onBoxClicked(movie.id)}
 />
```

<br>
<br>
그 다음으론 useMatch 훅을 사용하여 현재 URI가 괄호 안과 같다면 true 아니면 false를 반환해준다.
<br>
useMatch를 사용하다 아래와 같은 에러가 발생하게 된다.

```
Property 'movieId' does not exist on type 'Params<"id">'
```

<br>
movieId에 타입을 정해주지 않아서 나타난거 같다.
<br>
다행이 강의 댓글에 같은 오류를 겪으신 분이 계셔서 참고하였다.

```
const moviePathMatch: PathMatch<string> | null = useMatch(`/movies/:id`);

...

<AnimatePresence>
  {moviePathMatch ? (
    <>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
       />
      <BigMovie
        style={{ top: scrollY.get() + 100 }}
        layoutId={moviePathMatch.params.movieId}
      />
    </>
  ) : null}
</AnimatePresence>

```

<br>
<br>
하나 놓친게 있다면 App.tsx에서 페이지를 이동시켜줘야하는데 Home을 기반으로 이동을 시켜야한다.
<br>
그러나 우리는 페이지 이동이 아닌 URI만 변경하고 싶은데
<br>
이때 / 다음에 *을 붙이면 Home 컴포넌트로 보내게 된다.

```
// App.tsx

function App() {
  return (
    <Router>
      <Header />
      <Routes>
      // 아래와 같이 Home 컴포넌트 path에 *을 붙인다.
        <Route path="/*" element={<Home />} />
        <Route path="/moives/:id" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}
```

<br>
<br>
다음으론 해당 영화의 상세 페이지를 만들어야하는데 간단한 폼만 만들었다.
<br>
일단 BigMovie라는 상세 페이지를 가볍게 스타일링했고
<br>
useViewportScroll를 사용해서 스크롤 Y값을 얻고 그 Y값에 맞춰서 100px 밑으로 가도록 하여 상세 페이지 위치를 정하려한다.
<br>
이와 같이 하는 이유는 스크롤을 아래로 내렸을 때 상세 페이지가 중앙에 위치하고 싶어서 이다.
<br>

```

const { scrollY } = useViewportScroll();

 <BigMovie
  // scrollY에 100px을 더하여 준다.
   style={{ top: scrollY.get() + 100 }}
   layoutId={moviePathMatch.params.movieId}
 />
```
