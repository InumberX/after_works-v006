type SnsKey =
  | 'x'
  | 'instagram'
  | 'github'
  | 'youtube'
  | 'qiita'
  | 'note'
  | 'behance'
  | 'pixiv'

type SnsInfo = {
  id: string
  url: string
  title: string
}

export const snsInfos: {
  [key in SnsKey]: SnsInfo
} = {
  x: {
    id: 'x',
    url: 'https://twitter.com/InumberX',
    title: 'X',
  },
  instagram: {
    id: 'instagram',
    url: 'https://www.instagram.com/inumberx',
    title: 'Instagram',
  },
  github: {
    id: 'github',
    url: 'https://github.com/InumberX',
    title: 'GitHub',
  },
  youtube: {
    id: 'youtube',
    url: 'https://www.youtube.com/@NiNE-inumberx',
    title: 'YouTube',
  },
  qiita: {
    id: 'qiita',
    url: 'https://qiita.com/inumberx',
    title: 'Qiita',
  },
  note: {
    id: 'note',
    url: 'https://note.mu/inumberx',
    title: 'note',
  },
  behance: {
    id: 'behance',
    url: 'https://www.behance.net/inumberx21ac',
    title: 'Behance',
  },
  pixiv: {
    id: 'pixiv',
    url: 'https://www.pixiv.net/users/2146818',
    title: 'pixiv',
  },
}
