import { normalizeRoutes } from '@/utils/commom.util'

import { EResources } from '@/types/enum/resources.enum'

export const APP_ROUTES = {
  AUTH: {
    LOGIN: '/login',
  },
  COMMON: {
    INTRODUCE: '/introduce',
  },
  RESOURCES: {
    POST_MANAGEMENT: `/${EResources[EResources['post-management']]}`,
  },
} as const

export const RESOURCES_ROUTES: string[] = normalizeRoutes([...Object.values(APP_ROUTES.RESOURCES)])
