const { ApolloServer, gql } = require("apollo-server");

var coursesData = [
  {
    id: 1,
    title: "The Complete Node.js Developer Course",
    author: "Andrew Mead, Rob Percival",
    description:
      "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs/",
    user: {
      id: 1,
      name: "Test"
    }
  },
  {
    id: 2,
    title: "Node.js, Express & MongoDB Dev to Deployment",
    author: "Brad Traversy",
    description:
      "Learn by example building & deploying real-world Node.js applications from absolute scratch",
    topic: "Sujin",
    url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/",
    user: {
      id: 1,
      name: "Test"
    }
  },
  {
    id: 3,
    title: "JavaScript: Understanding The Weird Parts",
    author: "Anthony Alicea",
    description:
      "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
    topic: "JavaScriptt",
    url: "https://codingthesmartway.com/courses/understand-javascript/",
    user: {
      id: 1,
      name: "Test"
    }
  },
  {
    id: 4,
    title: "JavaScript",
    author: "Anthony Aliceaaaaa",
    description:
      "An advanced JavaSpe, closures, prototypes, this, build your own framework, and more.",
    topic: "JavaScript",
    url: "https://codingthesmartway.com/courses/understand-javascript/",
    user: {
      id: 2,
      name: "Test2"
    }
  },
  {
    id: 5,
    title: " Understanding The Weird Parts",
    author: "Anthony ",
    description:
      "An Scope, closures, prototypes, this, build your own framework, and more.",
    topic: "Rx",
    url: "https://codingthesmartway.com/courses/understand-javascript/",
    user: {
      id: 2,
      name: "Test"
    }
  },
  {
    id: 6,
    title: "Jg The Weird Parts",
    author: " Alicea",
    description:
      "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
    topic: "Design",
    url: "https://codingthesmartway.com/courses/understand-javascript/",
    user: {
      id: 3,
      name: "Test3"
    }
  }
];

const typeDefs = gql`
  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String 
    user: User
  }

  input CourseInput {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String 
    user: UserInput
  }

  input UserInput {
    id: Int
    name: String
  }


  type User {
    id: Int
    name: String
  }

  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
  }

  type Mutation {
    insertCourse(input: CourseInput): [Course]
  }
`;

const resolvers = {
  Query: {
    course: async (_, { id }) => {
      //return await
       return await coursesData.filter(course => {
        return (course.id == id);
      })[0]
    },
    courses: async (_, {topic}) => {
      console.log(topic);
      if (topic) {
        //var topic = topic;
        return await coursesData.filter(course => course.topic === topic);
      } else {
        return await coursesData;
      }
    }
  },
  Mutation: {
    insertCourse: async(_, { input }) => {
      console.log(input);
      if(input) {
        coursesData.push(input)
        return await coursesData;
      } else {
        return await coursesData;
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
