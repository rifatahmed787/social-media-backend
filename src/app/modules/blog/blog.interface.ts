import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'

export type IBlog = {
  title: string
  description: string
  name: string
  profile: string
  image: string[]
  tags: string[]
  added_by_id: Types.ObjectId | IUser
}

export type BlogModel = {
  validateBlogOwnership(
    blog_id: Types.ObjectId,
    owner_id: Types.ObjectId
  ): Promise<Partial<IBlog> | null>
  isBlogAvailable(id: Types.ObjectId | string): Promise<Partial<IBlog> | null>
} & Model<IBlog>

export type IBlogFilter = {
  title?: string
  name?: string
  searchTerm?: string
}
