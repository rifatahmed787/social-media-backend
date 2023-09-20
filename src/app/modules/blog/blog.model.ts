import { Schema, Types, model } from 'mongoose'
import { BlogModel, IBlog } from './blog.interface'

// And a schema that knows about IUserMethods

const BlogSchema = new Schema<IBlog, BlogModel>({
  title: { type: String, required: true },
  name: { type: String, required: true },
  profile: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: [String], required: true },
  tags: { type: [String], required: true },
  added_by_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
})

//validateBlogOwnership
BlogSchema.statics.validateBlogOwnership = async function (
  blog_id: Types.ObjectId,
  owner_id: Types.ObjectId
): Promise<Partial<IBlog> | null> {
  const blog = await Blog.findOne({
    _id: new Types.ObjectId(blog_id),
    added_by_id: new Types.ObjectId(owner_id),
  }).lean()

  return blog
}

//isBlogAvailable
BlogSchema.statics.isBlogAvailable = async function (
  id: Types.ObjectId
): Promise<Partial<IBlog> | null> {
  return await Blog.findById(id).lean()
}

export const Blog = model<IBlog, BlogModel>('Blog', BlogSchema)
