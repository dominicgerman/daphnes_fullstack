import {
  ContentContainer,
  BodyContainer,
} from './styles/StyledContainers.styled'
import { FullSizeImg } from './styles/StyledImages.styled'
import { AboutPageParagraph } from './styles/StyledText.styled'
import { Title } from './styles/StyledText.styled'

const About = () => (
  <BodyContainer>
    <Title>Our Founder</Title>
    <ContentContainer>
      <>
        <AboutPageParagraph>
          <a
            href="https://www.instagram.com/realdaphnemoon/"
            target="_blank"
            rel="noreferrer"
          >
            Daphne
          </a>
          , a floofy, polydactyl, longhair house cat, consumes precisely three
          martinis everyday before noon. Her proclivity for boozy, prohibition
          era cocktails has propelled her into a world of craft adult beverages
          that she has now decided to share with the world.
          <br />
          <br />
          Her libations are made even better when her {` `}
          <a
            href="https://www.dominicgerman.com"
            target="_blank"
            rel="noreferrer"
            className="about-link"
          >
            hoomans
          </a>{' '}
          decide to harvest fresh herbs from their community garden.
        </AboutPageParagraph>
      </>
      <FullSizeImg src="/imgs/our_founder.jpg" alt="daphne the cat" />
    </ContentContainer>
  </BodyContainer>
)

export default About
