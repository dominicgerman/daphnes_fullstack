import styled from 'styled-components'

// GENERAL PURPOSE

export const Container = styled.div`
  font-family: 'Barlow', sans-serif;
  line-height: 1;
  font-weight: 400;
  color: #ffffff;
  font-style: normal;
  max-width: 144rem;
  min-height: 100vh;
  padding: 4rem 8.4rem;
  margin: 0 auto;
  background-color: #1c1c1c;
  display: flex;
  flex-direction: column;
  @media (max-width: 35em) {
    padding: 2rem 2.4rem;
  }
`

export const BodyContainer = styled.div`
  flex-direction: column;
  gap: 3rem;
  margin-top: 4rem;
  display: flex;
  @media (max-width: 25.75em) {
    gap: 2.2rem;
  }
`

export const ContentContainer = styled.div`
  flex: 0 auto;
  justify-content: space-between;
  gap: 1.5rem;
  display: flex;
  @media (max-width: 50em) {
    flex-direction: column-reverse;
  }
`

export const ImgContainer = styled.div`
  flex-basis: 40.4rem;
`

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 3rem;
  @media (max-width: 25.75em) {
    margin-bottom: 0;
  }
`

export const StyledNavLinksContainer = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.9rem;
  display: flex;
  align-items: center;
  text-align: right;
  justify-content: flex-end;
  flex-grow: 1;
  gap: 2.4rem;

  @media (max-width: 25.75em) {
    flex-direction: column;
    justify-content: flex-start;
    transition: all 0.2s;
    font-size: 3rem;
    gap: 6rem;
    padding-top: 5rem;
    position: fixed;
    top: 12%;
    left: 0;
    width: 100%;
    height: 88vh;
    background-color: #1c1c1cf8;
    z-index: 5;

    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }
`

export const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`

// PAGE SPECIFIC

export const HomeContainer = styled.div`
  max-width: 144rem;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  column-gap: 2.4rem;
  margin: 0 auto;
  display: grid;
  @media (max-width: 40em) {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
`

export const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 50%;

  background-color: white;
  z-index: 10;

  font-size: 3rem;
  padding: 8rem;

  @media (max-width: 60em) {
    top: 25%;
    left: 20%;
    right: 20%;
    transform: translate(0%, -20%);
    max-width: 95%;
    padding: 7rem;
  }
  @media (max-width: 50rem) {
    top: 25%;
    left: 15%;
    right: 15%;
    transform: translate(0%, -20%);
    max-width: 95%;
  }
  @media (max-width: 40rem) {
    top: 25%;
    left: 10%;
    right: 10%;
    transform: translate(0%, -20%);
    max-width: 95%;
    padding: 6rem;
  }
  @media (max-width: 35rem) {
    top: 25%;
    left: 5%;
    right: 5%;
    transform: translate(0%, -20%);
    max-width: 95%;
    padding: 5rem;
    gap: 5rem;
  }
  @media (max-width: 20em) {
    padding: 1rem;
    gap: 2rem;
  }

  @media (max-height: 43.75em) {
    top: 0%;
    transform: translate(0%, -4%);
  }
`

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 5;
`

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  @media (max-width: 35em) {
    padding: 0;
    gap: 1rem;
  }
`

export const RecipeListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 3rem;
  row-gap: 4.8rem;
  justify-items: space-between;
  @media (max-width: 60em) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 50em) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 40em) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 25.75em) {
    row-gap: 1.8rem;
  }
`

export const SearchBar = styled.div`
  display: flex;
  align-self: flex-end;
  position: relative;
  @media (max-width: 40em) {
    align-self: center;
  }
`

export const SearchInput = styled.input`
  color: #fff;
  padding: 1rem;
  font-size: 2rem;
  border: 1px solid #ffffff;
  border-bottom-left-radius: 80px;
  border-top-left-radius: 80px;
  border-right: #1c1c1c;
  background: #1c1c1c;
  outline: none;
`

export const RecipeTextContainer = styled.div`
  flex-grow: 1;
  flex-basis: auto;
`
export const StyledAboutContainer = styled.div`
  display: grid;
  justify-content: center;
  max-width: 70.8rem;
  row-gap: 4rem;
  font-size: 2rem;
  line-height: 3.2rem;
  @media (max-width: 40em) {
    font-size: 1.6rem;
    line-height: 2.6rem;
    row-gap: 2rem;
  }
`
export const StyledSpecsContainer = styled(StyledAboutContainer)`
  column-gap: 2rem;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto 1fr;
  @media (max-width: 40em) {
    font-size: 1.6rem;
    line-height: 2.6rem;
    row-gap: 2rem;
  }
`
export const StyledSimilarToContainer = styled(StyledAboutContainer)`
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 3rem;
  @media (max-width: 40em) {
    font-size: 1.6rem;
    line-height: 2.6rem;
    row-gap: 2rem;
  }
`

export const TabsContainer = styled.div`
  width: 100%;
  border-bottom: 0.1rem solid #5e5e5e;
  margin-bottom: 5.6rem;
  @media (max-width: 40em) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.4rem;
  }
`
export const OutletContainer = styled.div`
  width: 100%;
  padding-left: 4rem;
  @media (max-width: 86em) {
    padding-left: 0;
  }
`

export const AboutContentContainer = styled(ContentContainer)`
  @media (max-width: 40em) {
    flex-direction: column-reverse;
    align-items: center;
  }
`
