import { request, gql } from "graphql-request"

// This is the file where we are making our GraphQL queries 
// graphqlAPI from GraphCMS account
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

// Query that gets all of the posts 
export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            id
                            name
                            photo {
                                url
                            }
                        }
                    slug
                    title
                    excerpt
                    createdAt
                    featuredImage {
                        url
                    }
                    categories {
                        name
                        slug
                    }
                    }
                }
            }
        }
      
    `
    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges
}

// Query that gets all of the posts 
export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: {slug: $slug}) {
                author {
                    bio
                    id
                    name
                    photo {
                        url
                    }
                }
                slug
                title
                excerpt
                createdAt
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                }    
            }
        }
      
    `
    const result = await request(graphqlAPI, query, {slug})

    return result.post
}

// Query that gets the three most recent posts for the PostWidget
export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query)

    return result.posts
}

// Query that gets related posts for the PostWidget for a specific slug (post)
export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query, {categories, slug})

    return result.posts
}

// Query that gets all categories for the posts for the Category sidebar
export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query)

    return result.categories
}

