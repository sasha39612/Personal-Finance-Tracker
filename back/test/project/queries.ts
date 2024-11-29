import gql from 'graphql-tag';

export const getProject = gql`
query projects($filter: ProjectFilterInput, $offsets: Inc!, $limit: Inc!) {
    projects(filter: $filter, offsets: $$offsets, limits: $limits) {
        id
        name
        overview
        description
        projectType
        isFinished
    }
}
`;

export const getProjectById = `
    query ($id: Int!) {
        projectById(id: $id) {
            id
            name
            overview
            description
            projectType
            isFinished
        }
    }
`;

export const createProject = `
    mutation (
        $name: String!
        $overview: String!
        $description: String!
        $projectType: ProjectType!
        $isFinished: Boolean!
    ) {
        createProject(
            name: $name
            overview: $overview
            description: $description
            projectType: $projectType
            isFinished: $isFinished
        ){
            id
            name
            overview
            description
            projectType
            isFinished
        }
    }
`;

export const updateProject = `
    mutation (
        $id: Int!
        $name: String!
        $overview: String!
        $description: String!
        $projectType: ProjectType!
        $isFinished: Boolean!
    ) {
        updateProject(
            id: $id
            project: {
                name: $name
                overview: $overview
                description: $description
                projectType: $projectType
                isFinished: $isFinished
            }
        ){
            id
            name
            overview
            description
            projectType
            isFinished
        }
    }
`;
