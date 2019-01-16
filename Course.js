const CourseType = new GraphQLObjectType({
  name: 'Course',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    description: { type: GraphQLString },
    topic: { type: GraphQLString },
    url: { type: GraphQLString }
  }
})