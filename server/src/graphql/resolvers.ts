/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { listings } from "../listings";
import { IResolvers } from "apollo-server-express";

export const resolvers: IResolvers = {
    Query: {
      listings: () => {
        return listings;
      }
    },
    Mutation: {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      deleteListing: (_root: undefined, { id }: { id: string }) => {
        for (let i = 0; i < listings.length; i++) {
          if (listings[i].id === id) {
            return listings.splice(i, 1)[0];
          }
        }
  
        throw new Error("failed to deleted listing");
      }
    }
  };
