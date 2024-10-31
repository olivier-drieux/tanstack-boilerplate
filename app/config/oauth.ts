import { BsDiscord, BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import type { IconBaseProps, IconType } from 'react-icons'

import type { InferAuthOptions } from '~/libs/auth'
import type { ExtractUnionStrict } from '~/libs/utils'

export type AllOAuthProviderId = InferAuthOptions<'signInOAuth'>['body']['provider']

export type SupportedOAuthProviderId = ExtractUnionStrict<
  AllOAuthProviderId,
  'discord' | 'github' | 'google'
>

export type OAuthConfig = {
  id: SupportedOAuthProviderId
  name: string
  icon: IconType
  size: IconBaseProps['size']
  logoColor: IconBaseProps['color']
  textColor: string
  backgroundColor: string
}

export const oauthConfigs: OAuthConfig[] = [
  {
    id: 'google',
    name: 'Google',
    icon: FcGoogle,
    size: 20,
    logoColor: undefined,
    textColor: '#000',
    backgroundColor: '#fff',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: BsDiscord,
    size: 20,
    logoColor: '#fff',
    textColor: '#fff',
    backgroundColor: '#5865f2',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: BsGithub,
    size: 20,
    logoColor: '#fff',
    textColor: '#fff',
    backgroundColor: '#333',
  },
]
