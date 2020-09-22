const graphql = require('graphql');
const _ = require('lodash');

// dummy data
let users = [
    {
        id: "1",
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        age: 20,
        profession: "Programmer"
    },
    {
        id: "2",
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        age: 23,
        profession: "DevOps"
    },
    {
        id: "3",
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        age: 25,
        profession: "Project Manager"
    },
];
let hobbies = [
    { id: "1", title: "Walking", description: "Walking...", userID: "2" },
    { id: "2", title: "Sport", description: "Sport...", userID: "3" },
    { id: "3", title: "Footbal", description: "Footbal...", userID: "1" },
    { id: "4", title: "PS5", description: "PS5...", userID: "2" },
    { id: "5", title: "Movies", description: "Movies...", userID: "3" }
];

let posts = [
    { id: "1", comment: "Example Comment 1", userID: "3" },
    { id: "2", comment: "Example Comment 2", userID: "2" },
    { id: "3", comment: "Example Comment 3", userID: "1" },
    { id: "4", comment: "Example Comment 4", userID: "2" },
    { id: "5", comment: "Example Comment 5", userID: "1" },
];


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;

// Create types 
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
        hobbies: {
            type: GraphQLList(HobbyType),
            resolve(parent, args) {
                // return hobbies.filter(cur => cur.userID == parent.id);
                return _.filter(hobbies, { userID: parent.id });
            }
        },
        posts: {
            type: GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(posts, { userID: parent.id });
            }
        }
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Documentation for user s hobby...',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(users, { id: parent.userID });
            }
        }

    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Documentation for user s post...',
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(users, { id: parent.userID });
            }
        }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Desc',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // resolve with data
                // get and return data from data source

                return _.find(users, { id: args.id });
            }
        },
        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(hobbies, { id: args.id });
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(posts, { id: args.id });
            }
        },
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations...',
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: { type: GraphQLID }
                name: { type: GraphQLString },
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
                profession: { type: GraphQLString },
            },
            resolve(parent, args) {
                let user = {
                    name: args.name,
                    username: args.username,
                    email: args.email,
                    age: args.age,
                    profession: args.profession
                };
                return user;
            }
        },
        createPost: {
            type: PostType,
            args: {
                // id: { type: GraphQLID }
                comment: { type: GraphQLString },
                userID: { type: GraphQLID },
            },
            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userID: args.userID,
                };
                return post;
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                // id: { type: GraphQLID }
                title: { type: GraphQLID },
                description: { type: GraphQLString },
                userID: { type: GraphQLID },
            },
            resolve(parent, args) {
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userID: args.userID,
                };
                return hobby;
            }
        },

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});