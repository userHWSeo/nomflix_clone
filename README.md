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
