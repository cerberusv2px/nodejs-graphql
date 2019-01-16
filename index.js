var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema, GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },

    type Mutation {
      createCourse(
        id: Int!
        title: String!
        author: String!
        description: String!
        topic: String!
        url: String!
        user: User
      ): String
    }

    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
        user: User
    }
    type User {
      id: Int
      name: String
    }

    schema {
      query: Query
      mutation: Mutation
    }
`);

var coursesData = [
  {
      id: 1,
      title: 'The Complete Node.js Developer Course',
      author: 'Andrew Mead, Rob Percival',
      description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs/',
      user: {
        id: 1,
        name: "Test"
      }
  },
  {
      id: 2,
      title: 'Node.js, Express & MongoDB Dev to Deployment',
      author: 'Brad Traversy',
      description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
      user: {
        id: 1,
        name: "Test"
      }
  },
  {
      id: 3,
      title: 'JavaScript: Understanding The Weird Parts',
      author: 'Anthony Alicea',
      description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
      topic: 'JavaScriptt',
      url: 'https://codingthesmartway.com/courses/understand-javascript/',
      user: {
        id: 1,
        name: "Test"
      }
  },
  {
    id: 4,
    title: 'JavaScript',
    author: 'Anthony Aliceaaaaa',
    description: 'An advanced JavaSpe, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/',
    user: {
      id: 2,
      name: "Test2"
    }
},
{
  id: 5,
  title: ' Understanding The Weird Parts',
  author: 'Anthony ',
  description: 'An Scope, closures, prototypes, this, build your own framework, and more.',
  topic: 'Rx',
  url: 'https://codingthesmartway.com/courses/understand-javascript/',
  user: {
    id: 2,
    name: "Test"
  }
},
{
  id: 6,
  title: 'Jg The Weird Parts',
  author: ' Alicea',
  description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
  topic: 'Design',
  url: 'https://codingthesmartway.com/courses/understand-javascript/',
  user: {
    id: 3,
    name: "Test3"
  }
}
]



var getCourse = function(args) { 
  var id = args.id;
  return coursesData.filter(course => {
      return course.id == id;
  })[0];
}
var getCourses = function(args) {
  if (args.topic) {
      var topic = args.topic;
      return coursesData.filter(course => course.topic === topic);
  } 
  else {
      return coursesData;
  }
}

var insertCourse = function(args) {
  coursesData.push(args);
  return coursesData;
}



// var addCourse = new GraphQLObjectType({
//   name: 'AddCourse',
//   fields: {
//     create: {
//       type:
//     }
//   }
// })

var root = {
  course: getCourse,
  courses: getCourses,
  createCourse: insertCourse
};

// var root = { hello: () => 'Hello world!', test:() => 'test' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to http://localhost:4000/graphql'));
