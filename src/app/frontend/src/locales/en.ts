export default {
  home: {
    title: 'Home',
    blog: {
      title: 'Blog',
      subTitle: 'Blog',
      listPageButtonText: 'Go to Blog List',
    },
    contents: {
      title: 'Contents',
      subTitle: 'Contents',
      about: {
        title: 'Career Introduction',
        description: 'I will introduce my career history and qualifications.',
        buttonText: 'Go to Career Introduction',
      },
      works: {
        title: 'Achievements Introduction',
        description:
          'I will introduce the works I have created for clients and as a hobby.',
        buttonText: 'Go to Achievements List',
      },
    },
    lead: {
      message:
        'Leveraging my experience as a Web Designer and Front-end Engineer, I consistently handle everything from design to coding.',
    },
    service: {
      title: 'Service',
      subTitle: 'Service',
      design: {
        title: 'Design',
        description: `Based on client's requests, I create designs.
I strive to produce designs that are practical for implementation and can withstand actual operation.
I propose designs that are optimal for the user, considering both appearance and usability.`,
      },
      coding: {
        title: 'Coding',
        description: `I code based on designs.
I can create various types of websites such as responsive sites that display optimally on various devices like computers and smartphones, update-friendly sites using WordPress, and sites with animations using JavaScript, according to client's requests.`,
      },
    },
  },
  about: {
    title: 'About',
    description:
      'I am a Front-end Engineer living in Tokyo: N/NE (Nine). This is my portfolio website. On this page, I introduce my profile, past experiences, and duties.',
    pageTitle: 'About',
    pageSubTitle: 'About',
    profile: {
      title: 'N/NE',
      subTitle: '[nʌɪn]',
      certification: {
        title: 'Certifications',
      },
      skill: {
        title: 'Skills',
      },
    },
  },
  blogs: {
    title: 'Blog',
    description:
      'I am a Front-end Engineer living in Tokyo: N/NE (Nine). This is my portfolio website. On this page, you can view a list of articles I have posted.',
    pageTitle: 'Blog',
    pageSubTitle: 'Blog',
    sideColumn: {
      latestArticle: {
        title: 'Recent Articles',
      },
    },
  },
  blogsDetail: {
    title: 'Blog',
    description:
      'I am a Front-end Engineer living in Tokyo: N/NE (Nine). This is my portfolio website. On this page, you can view the article titled {title}.',
    dateTitle: 'Post Date',
    bottomLinkText: 'Return to Blog List',
    sideColumn: {
      latestArticle: {
        title: 'Recent Articles',
      },
    },
  },
  contact: {
    title: 'Contact',
    description:
      'I am a Front-end Engineer living in Tokyo: N/NE (Nine). This is my portfolio website. Please feel free to contact me through this page.',
    pageTitle: 'Contact',
    pageSubTitle: 'Contact',
    message: {
      text: 'Please feel free to contact me using the form below.',
      buttonText: 'Contact',
      buttonUrl:
        'https://docs.google.com/forms/d/e/1FAIpQLSdl9eSdffNSyqMELqFAkLS1dfyDPRWzFxKacXdduVl7cMFTuw/viewform?usp=sf_link',
    },
  },
  hobby: {
    title: 'Hobby',
    description:
      'I am a Front-end Engineer living in Tokyo: N/NE (Nine). This is my portfolio website. On this page, I introduce things I have created for my hobbies and learning.',
    pageTitle: 'Hobby',
    pageSubTitle: 'Hobby',
    sideColumn: {
      latestArticle: {
        title: 'Recent Articles',
      },
    },
  },
  hobbyDetail: {
    title: 'Hobby',
    description:
      'I am a Front-end Engineer living in Tokyo: N/NE (Nine). This is my portfolio website. On this page, you can view the article titled {title}.',
    dateTitle: 'Creation Period',
    bottomLinkText: 'Return to Hobby List',
    tags: {
      position: {
        title: 'Role',
      },
      technology: {
        title: 'Technology Used',
      },
    },
    sideColumn: {
      latestArticle: {
        title: 'Recent Articles',
      },
    },
  },
  works: {
    title: 'Works',
    description:
      'I am a Front-end Engineer living in Tokyo: N/NE (Nine). This is my portfolio website. On this page, you can view a list of my past achievements and creations.',
    pageTitle: 'Works',
    pageSubTitle: 'Works',
    sideColumn: {
      latestArticle: {
        title: 'Recent Works',
      },
    },
  },
  worksDetail: {
    title: 'Works',
    description:
      'I am a Front-end Engineer living in Tokyo: N/NE (Nine). This is my portfolio website. On this page, you can view the article titled {title}.',
    dateTitle: 'Creation Period',
    bottomLinkText: 'Return to Works List',
    tags: {
      position: {
        title: 'Role',
      },
      technology: {
        title: 'Technology Used',
      },
    },
    sideColumn: {
      latestArticle: {
        title: 'Recent Works',
      },
    },
  },
  notFound: {
    title: 'The Page You Are Looking For Could Not Be Found',
    pageTitle: 'The Page You Are Looking For Could Not Be Found',
    pageSubTitle: 'Not Found',
    message: {
      text: `The page you are looking for may have been deleted or is temporarily unavailable.
Please check if the URL of the page you are looking for is correct.`,
      buttonText: 'Return to Top',
    },
  },
  components: {
    contact: {
      title: 'Contact',
      subTitle: 'Contact',
      message: `Whether you want a landing page, a WordPress site for high update frequency, or a website with rich expressions using JavaScript, I can meet various client requests.
I am also flexible in handling requests for design only or coding only.
Please feel free to contact me.`,
      buttonText: 'Contact',
    },
    basePagenation: {
      buttonText: 'Show page {pageNumber}',
      prevButtonText: 'Go back to previous page',
      nextButtonText: 'Go to next page',
    },
    layoutHeader: {
      menu: {
        buttonText: 'Menu',
        closeButtonText: 'Close',
      },
      locales: {
        title: 'Change the language',
      },
    },
  },
} as const
