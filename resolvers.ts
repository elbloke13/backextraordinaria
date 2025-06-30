//import { Collection } from "mongodb";
import { Character, CharacterAPI, House } from "./types.ts";
import { GraphQLError } from "graphql";

/*type Context = {
    TestCollection: Collection<TestModel>
}*/

type getCharactersArgs = {
    id: string[];
}

type getCharacterArgs = {
    id:string;
}

export const resolvers = {
    Query: {

        getCharacter: async(_:unknown, args: getCharacterArgs): Promise<Character | null> => {

            const {id} = args;

            const url = `https://hp-api.onrender.com/api/character/${id}`;

            const data = await fetch(url);

            if(data.status != 200) throw new GraphQLError("Api Error");

            const response:Character[] = await data.json();

            if(!response[0].id) return null;

            return (response[0]);

        },
        getCharacters: async (_:unknown,args?: getCharactersArgs): Promise<Character[]> => {

            if(args){
                const {id} = args;

                const urls = id.map((i) => `https://hp-api.onrender.com/api/character/${i}`);

                const data = await fetch(urls);

                if(data.status != 200) throw new GraphQLError("Api Error");

                const response: Character[] = await data.json();
                

                return response;
            }

            const url = `https://hp-api.onrender.com/api/characters`;

            const data = await fetch(url);

            if(data.status != 200) throw new GraphQLError("Api Error");

            const response: Character[] = await data.json();

            return response;

        }
    },

    Character:{
        house:async (parent: Character): Promise<House> => {

            const apihouse = parent.house;
            
            if(!apihouse) throw new GraphQLError("Esa casa es null");

            const url = `https://hp-api.onrender.com/api/characters/house/${apihouse?.name}`

            console.log(url);

            const data = await fetch(url);

            if(data.status != 200) throw new GraphQLError("Api HP Error");

            const response: House = await data.json();

            return response;
        }
    },

    House: {

        name:async(parent: Character): Promise<string> => {

            const id = parent.id;
            const url = `https://hp-api.onrender.com/api/character/${id}`;
            const data = await fetch(url);

            if(data.status != 200) throw new GraphQLError("Api Error");

            const response: CharacterAPI[] = await data.json();

            return response[0].house;

        },
        characters: (parent: Character): Character[] => {

            const characters = parent.house?.characters;

            if(!characters) throw new GraphQLError("No hay casa");

            return characters;

        }

    }
}