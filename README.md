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
