import { Schema, Types, model, Document } from 'mongoose'
import { MediaModel, IMedia } from './media.interface'

// Define the schema for the media document
const MediaSchema = new Schema<IMedia & Document, MediaModel>({
  description: { type: String, required: true },
  image: { type: String, required: true },
  added_by: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  like: [{ userId: String, userName: String, userImage: String }],
  comments: [{ userId: String, userName: String, userImage: String }],
})

// Validate media ownership
MediaSchema.statics.validateMediaOwnership = async function (
  media_id: Types.ObjectId,
  owner_id: Types.ObjectId
): Promise<Partial<IMedia> | null> {
  const media = await Media.findOne({
    _id: media_id,
    added_by: owner_id,
  }).lean()

  return media
}

// Check if media is available
MediaSchema.statics.isMediaAvailable = async function (
  id: Types.ObjectId
): Promise<Partial<IMedia> | null> {
  return await Media.findById(id).lean()
}

export const Media = model<IMedia & Document, MediaModel>('Media', MediaSchema)
