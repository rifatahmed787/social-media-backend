import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'

export type ILike = {
  userId: string
  userName: string
  userImage: string
}

export type IComment = {
  userId: string
  userName: string
  userImage: string
}

export type IMedia = {
  _id?: Types.ObjectId
  description: string
  image: string
  added_by: Types.ObjectId | IUser
  like: ILike[]
  comments: IComment[]
}

export type MediaModel = {
  validateMediaOwnership(
    media_id: Types.ObjectId,
    owner_id: Types.ObjectId
  ): Promise<Partial<IMedia> | null>
  isMediaAvailable(id: Types.ObjectId | string): Promise<Partial<IMedia> | null>
} & Model<IMedia>

export type IMediaFilter = {
  title?: string
  author?: string
  genre?: string
  publication_date?: string
  searchTerm?: string
}

export type IMediaFilteringItems = {
  all_genre: string[]
  all_publication_date: string[]
}
