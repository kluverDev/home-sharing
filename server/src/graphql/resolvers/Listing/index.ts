/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IResolvers } from "apollo-server-express";
import { Database, Listing } from "../../../lib/types";
import { ObjectId } from "mongodb";

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteRes.value) {
        throw new Error("failed to delete listing");
      }

      return deleteRes.value;
    },
  },
  Listing: {
    /* title: (listing: Listing) => listing.title,
    image: (listing: Listing) => listing.image, */

    //the above are trivial resolvers.  Even if we don't specify trivial resolvers, these fields _are_ being resolved but are taken care of by the GraphQL server library!
    //As a result, we don't have to define resolver functions for all our `Listing` fields _expect_ for the `id` field. A listing document in our collection contains an `_id` field while our API specifies an `id` field in our schema. Since the listing `obj` being passed from the root fields doesn't contain an `id` field without an underscore, we'll need to define a resolver for `id`.

    id: (listing: Listing): string => listing._id.toString(),
  },
};
