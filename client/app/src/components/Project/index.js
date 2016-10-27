import React, { PropTypes } from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Section from 'grommet-udacity/components/Section';
import Heading from 'grommet-udacity/components/Heading';
import Headline from 'grommet-udacity/components/Headline';
import Hero from 'grommet-udacity/components/Hero';
import Box from 'grommet-udacity/components/Box';
import Markdown from 'grommet-udacity/components/Markdown';
import Quote from 'grommet-udacity/components/Quote';
import Columns from 'grommet-udacity/components/Columns';
import Image from 'grommet-udacity/components/Image';
import Footer from 'grommet-udacity/components/Footer';
import Button from 'grommet-udacity/components/Button';
import SocialGithubIcon from 'grommet-udacity/components/icons/base/SocialGithub';
import ViewIcon from 'grommet-udacity/components/icons/base/View';
import { Divider } from 'components';

const Project = ({
  project,
}) => (
  <Box className={styles.alignToTop}>
    <Hero
      backgroundImage={project.featureImage}
    >
      <Headline align="center" className={styles.heroHeader}>
        {project.title}
      </Headline>
      <Heading tag="h3" align="center" className={styles.heroHeader}>
        {project.caption}
      </Heading>
    </Hero>
    <Section pad="large" primary>
      <Heading align="center">
        About the Project
      </Heading>
      <Divider />
      <Box align="center" justify="center" pad="large">
        <Box className="card">
          <Box pad="medium">
            <Markdown content={project.description} />
          </Box>
        </Box>
      </Box>
      <Footer align="center" justify="center">
        <Button
          label="View Live"
          icon={<ViewIcon />}
          style={{ marginRight: 10 }}
          primary
          href={project.projectUrl}
        />
        <Button
          label="View Repo"
          primary
          icon={<SocialGithubIcon />}
          href={project.repoUrl}
        />
      </Footer>
    </Section>
    <Section>
      <Heading align="center">
        Milestones
      </Heading>
      <Divider />
      <Box align="center" justify="center" pad="large">
        <Box className="card">
          <Box pad="medium">
            <Markdown content={project.milestones} />
          </Box>
        </Box>
      </Box>
    </Section>
    {project.technicalReview && project.reviewerName &&
      <Section>
        <Heading align="center">
          Expert Technical Review
        </Heading>
        <Divider />
        <Box align="center" justify="center" pad="large">
          <Box className="card">
            <Box pad="medium">
              <Quote credit={`- ${project.reviewerName}`}>
                <Markdown content={project.technicalReview} />
              </Quote>
            </Box>
          </Box>
        </Box>
      </Section>
    }
    <Section>
      <Heading align="center">
        Technical Information
      </Heading>
      <Divider />
      <Box align="center" justify="center" pad="large">
        <Box className="card">
          <Box pad="medium">
            <Markdown content={project.technicalInformation} />
          </Box>
        </Box>
      </Box>
    </Section>
    <Section>
      <Heading align="center">
        Design Patterns
      </Heading>
      <Divider />
      <Box align="center" justify="center" pad="large">
        <Box className="card">
          <Box pad="medium">
            <Markdown content={project.designPatterns} />
          </Box>
        </Box>
      </Box>
    </Section>
    {project.images && project.images.length > 0 &&
      <Section full="hortizontal">
        <Heading align="center">
          Project Gallery
        </Heading>
        <Divider />
        <Box
          full="horizontal"
          pad={{ vertical: 'large' }}
        >
          <Columns
            masonry
            align="center"
            justify="center"
            maxCount={6}
          >
            {project.images.map((image, i) =>
              <Box key={i}>
                <Image src={image.src} alt={`${project.title} image #${i}`} />
              </Box>
            )}
          </Columns>
        </Box>
      </Section>
    }
  </Box>
);

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

export default cssModules(Project, styles);