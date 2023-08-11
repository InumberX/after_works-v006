type SnsInfo = {
  id: string
  url: string
  title: string
}

export const snsInfos: {
  [key: string]: SnsInfo
} = {
  twitter: {
    id: 'twitter',
    url: 'https://twitter.com/InumberX/',
    title: 'Twitter',
  },
  instagram: {
    id: 'instagram',
    url: 'https://www.instagram.com/inumberx/',
    title: 'Instagram',
  },
  github: {
    id: 'github',
    url: 'https://github.com/InumberX/',
    title: 'GitHub',
  },
  youtube: {
    id: 'youtube',
    url: 'https://www.youtube.com/channel/UCjd4GJBAQ1eIs-dXPEBbYng/',
    title: 'YouTube',
  },
  qiita: {
    id: 'qiita',
    url: 'https://qiita.com/inumberx/',
    title: 'Qiita',
  },
  note: {
    id: 'note',
    url: 'https://note.mu/inumberx/',
    title: 'note',
  },
  behance: {
    id: 'behance',
    url: 'https://www.behance.net/inumberx21ac/',
    title: 'Behance',
  },
  pixiv: {
    id: 'pixiv',
    url: 'https://www.pixiv.net/users/2146818/',
    title: 'pixiv',
  },
}
