import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import { MediaController } from './media.controller'
import {
  create_media_zod_schema,
  update_media_zod_schema,
} from './media.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/',
  authHandler(),
  requestValidationHandler(create_media_zod_schema),
  MediaController.createMedia
)

router.get('/', MediaController.allmedias)
router.get('/latest-three', MediaController.latestThreeMedia)

// router.get('/unique-filter-items', MediaController.uniqueFilteringData)

router.get('/:id', MediaController.mediaDetails)

router.patch(
  '/:id',
  authHandler(),
  requestValidationHandler(update_media_zod_schema),
  MediaController.updateMedia
)

router.patch('/toggle-like/:id', authHandler(), MediaController.toggleLike)

router.delete('/:id', authHandler(), MediaController.deleteMedia)

export const MediaRoute = router
