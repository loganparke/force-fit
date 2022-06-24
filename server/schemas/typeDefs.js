const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Exercise {
    _id: ID
    name: String
    equipment: String
    description: String
    category: Category
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    workouts: Workout
  }

  type Auth {
    token: ID
    user: User
  }

  # workout type needs fixing
  type Workout {
    _id: ID
    workoutExercises: [Exercise]
    duration: Int
    distance: Int
    weight: Int
    sets: Int
    reps: Int
    day: String
  }

  type Query {
    categories: [Category]
    exercises(category: ID, name: String): [Exercise]
    exercise(_id: ID): Exercise
    users: [User!]
    user(firstName: String): User
    workouts: [Workout]
    workout(_id: ID!): Workout
    #checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addWorkout(exercises: [ID]!): Workout
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User

    login(email: String!, password: String!): Auth
  }
`;

// line 38 updateExercise(_id: ID!, quantity: Int!): Exercise

module.exports = typeDefs;
