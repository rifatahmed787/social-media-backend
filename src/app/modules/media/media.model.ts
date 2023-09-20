import { Schema, Types, model } from 'mongoose'
import { MediaModel, IMedia } from './media.interface'

// And a schema that knows about IUserMethods

const MediaSchema = new Schema<IMedia, MediaModel>({
  description: { type: String, required: true },
  image: { type: String, required: true },

  added_by: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
})

//validatemediaOwnership
MediaSchema.statics.validateMediaOwnership = async function (
  media_id: Types.ObjectId,
  owner_id: Types.ObjectId
): Promise<Partial<IMedia> | null> {
  const media = await Media.findOne({
    _id: new Types.ObjectId(media_id),
    added_by: new Types.ObjectId(owner_id),
  }).lean()

  return media
}

//ismediaAvailable
MediaSchema.statics.isMediaAvailable = async function (
  id: Types.ObjectId
): Promise<Partial<IMedia> | null> {
  return await Media.findById(id).lean()
}

export const Media = model<IMedia, MediaModel>('Media', MediaSchema)
