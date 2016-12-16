import React, { PropTypes } from 'react';
import Hero from 'grommet-udacity/components/Hero';
import Headline from 'grommet-udacity/components/Headline';
import Heading from 'grommet-udacity/components/Heading';
import Box from 'grommet-udacity/components/Box';
import Animate from 'grommet-udacity/components/Animate';
import Footer from 'grommet-udacity/components/Footer';
import Button from 'grommet-udacity/components/Button';
import { LogoImage } from 'components';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import cn from 'classnames';

const HeroSection = ({
  headline,
  image,
  button,
  isHovered,
}) => (
  <Hero
    id="hero-section"
    colorIndex="grey-1"
    justify="center"
    size="large"
    backgroundImage="https://github.com/RyanCCollins/cdn/blob/master/misc/pattern-2.png?raw=true"
  >
    <Box align="center" justify="center" style={{ width: '100%' }}>
      <Animate
        visible={image}
        enter={{ animation: 'slide-down', duration: 1500 }}
        className={cn('float-animation', styles.logoImageWrapper)}
        keep
      >
        <LogoImage />
      </Animate>
      <Animate
        visible={image}
        enter={{ animation: 'slide-up', duration: 1500 }}
        keep
      >
        <div className={styles.logo}>
          <div className={cn(styles.reactLogo, isHovered ? styles.hovered : '')}>
            <div className={styles.reactive} />
          </div>
        </div>
      </Animate>
      <Animate
        visible={headline}
        enter={{ animation: 'slide-up', duration: 1500 }}
        keep
      >
        <Headline
          strong
          align="center"
          className={cn('lobster', styles.mainText, styles.headingText)}
        >
          Ryan Collins
        </Headline>
        <Heading tag="h3" strong align="center" className={cn('lobster', styles.mainText)}>
          Software Engineer
        </Heading>
      </Animate>
      <Animate
        visible={button}
        enter={{ animation: 'slide-up', duration: 1500 }}
        keep
      >
        <Footer className={styles.footer}>
          <Button className={styles.button} href="/contact" label="Get in Touch" />
        </Footer>
      </Animate>
    </Box>
  </Hero>
);

HeroSection.propTypes = {
  button: PropTypes.bool.isRequired,
  image: PropTypes.bool.isRequired,
  headline: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

export default cssModules(HeroSection, styles);
