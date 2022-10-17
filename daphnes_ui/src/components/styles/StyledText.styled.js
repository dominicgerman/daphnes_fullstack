import styled from 'styled-components'

// GENERAL

export const NavHeader = styled.h1`
  font-weight: 700;
  font-size: 3.4rem;
  line-height: 4.1rem;

  color: #ffffff;
  @media (max-width: 40em) {
    font-size: 2.4rem;
  }
`

export const Title = styled.h1`
  font-family: Barlow;
  font-size: 6.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 7.7rem;
  @media (max-width: 35em) {
    font-size: 4.2rem;
    line-height: inherit;
  }
`
export const StyledParagraph = styled.p`
  font-size: 2rem;
  line-height: 3.2rem;
  font-family: Barlow, sans-serif;
  font-style: normal;
  font-weight: 400;
  padding-right: 2rem;
  @media (max-width: 40em) {
    font-size: 1.6rem;
    line-height: 2.6rem;
    row-gap: 2rem;
  }
`
export const StyledThumbnailText = styled.p`
  font-size: 2rem;
  line-height: 3.2rem;
  @media (max-width: 60em) {
    font-size: 1.6rem;
  }
`

// HOME
export const StyledHomeText = styled.p`
  grid-column: span 3;
  font-size: 3rem;
  font-weight: 400;
  line-height: 3.6rem;
  @media (max-width: 80em) {
    font-size: 2rem;
    line-height: inherit;
  }
  @media (max-width: 50em) {
    font-size: 1.6rem;
  }
  @media (max-width: 40em) {
    margin-top: 3rem;
  }
  @media (max-width: 35em) {
    font-size: 2rem;
    line-height: 2.4rem;
    padding: 4rem;
    text-align: center;
  }
`

export const StyledModalTitle = styled.p`
  color: #1c1c1c;
  align-self: center;
  font-size: 3rem;
  @media (max-width: 35em) {
    margin: 0;
    margin-top: 4rem;
    font-size: 80%;
  }
`

export const MenuItemDescription = styled.p`
  color: #1c1c1c;
  margin-bottom: 2.4rem;
  font-size: 2rem;
  text-decoration: none;
  list-style: none;
  padding-top: 1rem;
  @media (max-width: 35em) {
    font-size: 50%;
    margin-bottom: 1.2rem;
    padding-top: 0;
  }
`

// RECIPE
export const StyledDescription = styled.p`
  font-size: 2.4rem;
  margin-bottom: 7rem;
  @media (max-width: 50em) {
    margin-bottom: 0;
  }
  @media (max-width: 35em) {
    font-size: 1.6rem;
  }
`

export const StyledIngredients = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`
export const StyledAmounts = styled(StyledIngredients)`
  align-items: flex-end;
`
export const StyledInstructions = styled(StyledParagraph)`
  grid-column: span 2;
  @media (max-width: 40em) {
    font-size: 1.6rem;
    line-height: 2.6rem;
    row-gap: 2rem;
  }
`

// ABOUT
export const AboutPageParagraph = styled(StyledParagraph)`
  font-size: 2.4rem;
  line-height: 2.9rem;
  @media (max-width: 60em) {
    font-size: 2rem;
  }
  @media (max-width: 60em) {
    font-size: 1.8rem;
    line-height: 2.6rem;
    padding: 2.6rem;
  }
`
