import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { MediaServices } from './media.services'

// Create media
const createMedia = catchAsync(async (req: Request, res: Response) => {
  const { ...media_data } = req.body
  const user_data = req.logged_in_user
  const result = await MediaServices.create_new_media(media_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Media created successfully',
  })
})

//  updatemedia
const updateMedia = catchAsync(async (req: Request, res: Response) => {
  const { id: media_id } = req.params
  const { _id: owner_id } = req.logged_in_user

  const { ...media_data } = req.body
  const result = await MediaServices.update_media(
    media_data,
    media_id,
    owner_id
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Media updated successfully',
  })
})

const toggleLike = catchAsync(async (req: Request, res: Response) => {
  const { id: media_id } = req.params
  const { _id: user_id } = req.logged_in_user
  const user_details = {
    userId: user_id,
    userName: req.logged_in_user.username,
    userImage: req.logged_in_user.profileImage,
  }

  const result = await MediaServices.toggle_like(
    media_id,
    user_id,
    user_details
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Like toggled successfully',
  })
})

//  Get all media
const allmedias = catchAsync(async (req: Request, res: Response) => {
  const result = await MediaServices.gel_all_medias()

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Medias retrieved successfully',
  })
})

//  Get all latestthreemedia
const latestThreeMedia = catchAsync(async (req: Request, res: Response) => {
  const result = await MediaServices.latest_three_media()

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Medias retrieved successfully',
  })
})

//  Get all meida
// const uniqueFilteringData = catchAsync(async (req: Request, res: Response) => {
//   const result = await MediaServices.get__unique_filtering_items()

//   sendResponse(res, {
//     status_code: httpStatus.OK,
//     success: true,
//     data: result,
//     message: 'Filtering Items retrieved successfully',
//   })
// })

//   Get   media Details
const mediaDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await MediaServices.get_media_details(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Media details retrieved successfully',
  })
})

//  Delete   media
const deleteMedia = catchAsync(async (req: Request, res: Response) => {
  const { id: media_id } = req.params
  const { _id: user_id } = req.logged_in_user
  const result = await MediaServices.delete_media(media_id, user_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Media deleted successfully',
  })
})

export const MediaController = {
  createMedia,
  mediaDetails,
  toggleLike,
  updateMedia,
  deleteMedia,
  allmedias,
  // uniqueFilteringData,
  latestThreeMedia,
}
