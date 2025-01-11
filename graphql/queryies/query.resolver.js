const query = `#graphql
    type Query{
        categories:[Category]
        categoryFood:[CategoryFood]
        foods:[Food]
    }
`;

module.exports = query;