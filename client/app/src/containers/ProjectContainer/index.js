import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActionCreators from './actions';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import { WithLoading, WithToast, Project } from 'components';
import projectData from 'fragments/projectData';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ProjectContainer extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
  }
  render() {
    const {
      isLoading,
      project,
      loadingError,
      actions,
    } = this.props;
    return (
      <WithLoading isLoading={isLoading}>
        <WithToast
          error={loadingError}
          onClose={(type) => actions.clearProjectToast(type)}
        >
          {project &&
            <Project project={project} />
          }
        </WithToast>
      </WithLoading>
    );
  }
}

ProjectContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  project: PropTypes.object,
  loadingError: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

ProjectContainer.propTypes = {
  params: PropTypes.object.isRequired,
};

// mapStateToProps :: {State} -> {Props}
const mapStateToProps = (state) => ({
  // myProp: state.myProp,
});

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    ProjectActionCreators,
    dispatch
  ),
});

const Container = cssModules(ProjectContainer, styles);

const getProjectsQuery = gql`
  query loadProject($slug: String!) {
    project(slug: $slug) {
      ...projectData
    }
  }
`;

const ContainerWithData = graphql(getProjectsQuery, {
  options: (ownProps) => ({
    fragments: [projectData],
    skip: !ownProps.params.slug,
    variables: {
      slug: ownProps.params.slug,
    },
  }),
  props: ({ data: { project, loading, error } }) => ({
    project,
    isLoading: loading,
    loadingError: error,
  }),
})(Container);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerWithData);
