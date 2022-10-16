import styled from 'styled-components'

export const SearchButton = styled.button`
  width: 4rem;
  padding-bottom: 0.5rem;
  padding-right: 0.8rem;
  border: 1px solid #ffffff;
  border-bottom-right-radius: 80px;
  border-top-right-radius: 80px;
  border-left: #1c1c1c;
  background: #1c1c1c;
  color: #fff;
  font-size: 2rem;
`

export const MenuButton = styled.button`
  cursor: pointer;
  font-family: inherit;
  font-size: 3rem;
  font-weight: 400;
  line-height: 3.6rem;
  border: none;
  border-bottom: 0.1rem solid #fff;
  padding-bottom: 0.5rem;
  color: #fff;
  background-color: #1c1c1c;
  &:hover {
    color: #717171;
    border-bottom: 0.1rem solid #717171;
  }
`

export const CloseMenuButton = styled.button`
  color: #717171;
  cursor: pointer;
  background: 0 0;
  border: none;
  font-family: Barlow, sans-serif;
  font-size: 2.4rem;
  position: absolute;
  top: 4.4rem;
  right: 6.4rem;
`

export const TabButton = styled.button`
  font-size: 1.4rem;
  line-height: 1.7rem;
  min-width: 11.6rem;
  color: #fff;
  background-color: #1c1c1c;
  border: none;
  font-family: inherit;
  cursor: pointer;
  &:hover {
    color: #5e5e5e;
  }
`

export const FooterButton = styled.button`
  color: #5e5e5e;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.8rem;
  background: none;
  border: none;
  cursor: pointer;
`
