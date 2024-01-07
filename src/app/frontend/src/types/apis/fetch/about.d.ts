const apiResponseAboutList = {
  topics_id: 6,
  ymd: '1970-01-01',
  contents_type: 28,
  subject: '経歴（開発）',
  topics_flg: 1,
  open_flg: 1,
  regular_flg: 0,
  inst_ymdhi: '2023-08-18T11:33:31+09:00',
  update_ymdhi: '2024-01-06T18:58:55+09:00',
  topics_group_id: 10,
  contents_type_expand: '0',
  slug: '',
  order_no: 0,
  group_nm: '経歴（開発）',
  group_description: '',
  contents_type_cnt: 1,
  contents_type_nm: '経歴（開発）',
  contents_type_slug: null,
  contents_type_parent_nm: null,
  category_parent_id: null,
  contents_type_ext_col_01: null,
  contents_type_ext_col_02: null,
  contents_type_ext_col_03: null,
  contents_type_ext_col_04: null,
  contents_type_ext_col_05: null,
  lead: '都内でWebデザイナー、フロントエンドエンジニアとしてWeb制作に携わっています。\r\n1992年4月東京都生まれで、大学在学中はC、Java等のプログラミング言語や3DCGについて学びました。\r\n専攻はユーザコンピュータインタラクションです。\r\n\r\n2015年4月よりSIerにてシステムエンジニアとして勤務し、Javaを用いたシステム開発および保守・運用に携わりました。\r\n2017年1月より同社で異動し、Webデザイナー、フロントエンドエンジニアを兼任する形で勤務しました。\r\nその後、2022年2月にパーソルイノベーション株式会社（eiicon company）にフロントエンドエンジニアとして転職しました。\r\n\r\n現在は正社員として自社サービスのフロントエンドのコーディングを手掛ける傍ら、フリーランスとしてもWeb制作に携わっています。\r\nJavaScriptを用いたフロントエンドの実装を特に得意としています。',
  certifications: [
    {
      certification_name: '1級ウェブデザイン技能士',
      certification_name_en: 'Level 1 Web Design Technician',
      certification_url: 'https://www.webdesign.gr.jp/',
    },
    {
      certification_name: '基本情報技術者',
      certification_name_en: 'Fundamental Information Technology Engineer',
      certification_url: 'https://www.ipa.go.jp/shiken/kubun/list.html',
    },
    {
      certification_name: 'Webデザイナー検定ベーシック',
      certification_name_en: 'Web Designer Certification Basic',
      certification_url: 'https://www.cgarts.or.jp/v1/kentei/about/web/',
    },
    {
      certification_name: 'CGクリエイター検定ベーシック',
      certification_name_en: 'Basic CG Creator Certification',
      certification_url: 'https://www.cgarts.or.jp/v1/kentei/about/creator/',
    },
  ],
  skills: [
    'HTML, CSS, Sass, JavaScript, Vue.js, Nuxt.js, React, Next.js, jQuery, EJS',
    'WordPress, Movable Type',
    'PHP, Java',
    'Adobe Photoshop, Adobe Illustrator, Adobe XD, Adobe Fireworks, Docker',
  ],
  lead_en:
    'I am a Web Designer and Front-End Engineer based in Tokyo. Born in April 1992 in Tokyo, I studied programming languages like C and Java, as well as 3D computer graphics, during my university years, majoring in User Computer Interaction.\r\n\r\nI started working as a System Engineer at an SIer in April 2015, where I was involved in system development and maintenance using Java. In January 2017, I transitioned within the same company to take on dual roles as a Web Designer and Front-End Engineer.\r\n\r\nIn February 2022, I moved to Persol Innovation Co., Ltd. (eiicon company) as a Front-End Engineer. Currently, I work as a full-time employee, handling the front-end coding of our in-house services, while also engaging in web production as a freelancer. I specialize in front-end implementation using JavaScript.',
}

export type ApiResponseAboutData = typeof apiResponseAboutList

export type ApiResponseAbout = {
  category_id: '28'
  category: {
    category_nm: '経歴（開発）'
    parent_id: ''
    memo: ''
    topics_group_id: '10'
    category_weight: ''
    ext_col_01: ''
    ext_col_02: ''
    ext_col_03: ''
    ext_title: ''
    open_flg: '1'
    ext_col_04: ''
    ext_col_05: ''
    slug: ''
    topics_category_ids: ['28']
    category_nms: ['経歴（開発）']
    child_level: 1
    category_id: '28'
  }
  errors: []
  messages: []
  list: ApiResponseAboutData[]
}[]
