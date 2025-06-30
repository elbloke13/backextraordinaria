import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";
import { schema } from "./schema.ts";


/*
const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  throw new Error("No se ha encontrado la varaible de entorno MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Conectado a MongoDB");

const mongoDB = mongoClient.db("testOrdinaria");

const TestCollection = mongoDB.collection<TestModel>("test");*/

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server);

console.info(`Server ready at ${url}`);