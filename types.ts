/*import { ObjectId, OptionalId } from 'mongodb';

export type TestModel = OptionalId<{
    mensaje: string
}>

export type Test = {
    mensaje: string
}*/

export type Character = {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: House | null;
};
 
export type House = {
  name: string;
  characters: Character[];
};

export type CharacterAPI = {
    id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
}