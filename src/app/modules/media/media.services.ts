import { GenericResponse } from '../../../interfaces/common'

import ApiError from '../../errors/ApiError'
import { ILike, IMedia } from './media.interface'
import { Media } from './media.model'
import { User } from '../user/user.model'
import { IUser } from '../user/user.interface'
import httpStatus from 'http-status'
import { Types } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'

// Create new media
const create_new_media = async (
  media_data: IMedia,
  user_data: JwtPayload
): Promise<IMedia | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    user_data?._id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const created_media = await Media.create(media_data)

  return created_media
}

// Toggle like on media
const toggle_like = async (
  media_id: Types.ObjectId | string,
  user_id: Types.ObjectId | string,
  user_details: ILike
): Promise<IMedia | null> => {
  const media = await Media.findById(media_id)

  if (!media) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Media not found')
  }

  // Check if the user has already liked this media
  const existingLikeIndex = media.like.findIndex(
    like => like.userId === user_id
  )

  if (existingLikeIndex === -1) {
    // User has not liked the media, add the like
    media.like.push(user_details)
  } else {
    // User has already liked the media, remove the like
    media.like.splice(existingLikeIndex, 1)
  }

  // Save the updated media
  await media.save()

  return media
}

//  gel_all_books
const gel_all_medias = async (): Promise<GenericResponse<IMedia[]> | null> => {
  const all_medias = await Media.find({})

  return {
    data: all_medias,
  }
}

//  latestTenBooks
const latest_three_media = async (): Promise<IMedia[] | null> => {
  const latest_medias = await Media.aggregate([
    {
      $lookup: {
        from: 'like',
        localField: '_id',
        foreignField: 'mediaId',
        as: 'like',
      },
    },
    {
      $addFields: {
        likeCount: { $size: '$like' },
      },
    },
    {
      $sort: { likeCount: -1 },
    },
    {
      $limit: 3,
    },
    {
      $project: {
        likes: 0,
      },
    },
  ])

  return latest_medias
}

//  gel_all_genre
// const get__unique_filtering_items =
//   async (): Promise<GenericResponse<IMediaUniqueFilteringItems> | null> => {
//     // and conditions (for search and filter)
//     const all_genre = await Media.distinct('genre')
//     const all_publication_date = await Media.distinct('publication_date')
//     return {
//       data: { all_genre, all_publication_date },
//     }
//   }

//book detail
const get_media_details = async (id: string): Promise<IMedia | null> => {
  const isExist = await Media.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Media not found')
  }

  //
  const media_details = await Media.findById(id).populate('added_by')

  return media_details
}

// Update media
const update_media = async (
  media_data: Partial<IMedia>,
  media_id: Types.ObjectId | string,
  owner_id: Types.ObjectId
): Promise<IMedia | null> => {
  // book User checking

  if (
    !(await Media.validateMediaOwnership(media_id as Types.ObjectId, owner_id))
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not valid owner for this media'
    )
  }

  const updated_media_data = await Media.findByIdAndUpdate(
    media_id,
    media_data,
    {
      new: true,
    }
  ).populate('added_by')

  if (!updated_media_data) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to update media data'
    )
  }

  return updated_media_data
}

//  Delete media
const delete_media = async (
  media_id: string | Types.ObjectId,
  owner_id: Types.ObjectId
): Promise<IMedia | null> => {
  // book User checking
  if (
    !(await Media.validateMediaOwnership(media_id as Types.ObjectId, owner_id))
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not valid owner for this book'
    )
  }

  const media = await Media.findByIdAndDelete(media_id).populate('added_by')

  if (!media) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to delete media')
  }

  return media
}

export const MediaServices = {
  create_new_media,
  toggle_like,
  update_media,
  gel_all_medias,
  get_media_details,
  delete_media,
  // get__unique_filtering_items,
  latest_three_media,
}
