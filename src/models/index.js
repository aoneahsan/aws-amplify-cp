// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PostCategory, Post, Comment } = initSchema(schema);

export {
  PostCategory,
  Post,
  Comment
};