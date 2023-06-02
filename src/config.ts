import type { SocialObjects, Project } from './types';

import {
  BobaeBilimLogo,
  PaldoGamesLogo,
  StackOverflowLogo,
} from './assets/projects';

export const SITE = {
  website: 'https://keonheelee.vercel.app/',
  author: 'Keonhee Lee',
  desc: "Keonhee Lee's Blog",
  title: 'Keonhee',
  ogImage: 'astropaper-og.jpg',
  lightAndDarkMode: true,
  postPerPage: 5,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const POST_CATEGORIES = ['CS', 'Generics', 'ETC'];

export const PROJECT_LIST: Project[] = [
  {
    title: '보배빌림',
    type: 'Frontend',
    image: BobaeBilimLogo,
    desc: '전기자동차 충전소 부족 문제 해결을 위한 보조배터리 대여 서비스 보배빌림',
    tags: [
      'Typescript',
      'React',
      'styled-components',
      'recoil',
      'react-query',
      'MSW',
      'Vite',
    ],
    liveUrl:
      'http://battery-bucket-deploy.s3-website.ap-northeast-2.amazonaws.com/',
    codeUrl: 'https://github.com/codestates-seb/seb40_main_030',
    retrospective: 'https://medium.com/p/3029d90b7fb',
  },
  {
    title: '팔도게임즈',
    type: 'Frontend',
    image: PaldoGamesLogo,
    desc: '코드스테이츠 40기 수강생들을 위한 커뮤니티 및 게임모음 팔도게임즈',
    tags: ['Next.js', 'styled-components', 'recoil'],
    liveUrl: 'https://paldo-games.vercel.app/',
    codeUrl: 'https://github.com/haileyport/PaldoGames/tree/keonhee',
    retrospective:
      'https://medium.com/@2kunhee94/%ED%8C%94%EB%8F%84%EA%B2%8C%EC%9E%84%EC%A6%88-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0-cf1b432700eb',
  },
  {
    title: 'Stack Overflow Clone',
    type: 'Frontend',
    image: StackOverflowLogo,
    desc: '코드스테이츠 Pre-project Stack Overflow',
    tags: ['React', 'styled-components', 'recoil', 'react-query', 'MSW'],
    liveUrl:
      'http://pre-project-deploy.s3-website.ap-northeast-2.amazonaws.com/',
    codeUrl: 'https://github.com/codestates-seb/seb40_pre_001',
    retrospective:
      'https://medium.com/@2kunhee94/%EC%BD%94%EB%93%9C%EC%8A%A4%ED%85%8C%EC%9D%B4%EC%B8%A0-pre-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0-8661ea0c5bd1',
  },
];

export const SOCIALS: SocialObjects = [
  {
    name: 'Github',
    href: 'https://github.com/leezer94',
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/keonhee-lee-2964b421a/',
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: 'Medium',
    href: 'https://medium.com/@2kunhee94',
    linkTitle: `${SITE.title} on Medium`,
    active: true,
  },
  {
    name: 'Facebook',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Facebook`,
    active: false,
  },
  {
    name: 'Instagram',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Instagram`,
    active: false,
  },

  {
    name: 'Mail',
    href: 'mailto:yourmail@gmail.com',
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: 'Twitter',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: 'Twitch',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Twitch`,
    active: false,
  },
  {
    name: 'YouTube',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: 'WhatsApp',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false,
  },
  {
    name: 'Snapchat',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Snapchat`,
    active: false,
  },
  {
    name: 'Pinterest',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Pinterest`,
    active: false,
  },
  {
    name: 'TikTok',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on TikTok`,
    active: false,
  },
  {
    name: 'CodePen',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
  {
    name: 'Discord',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: 'GitLab',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: 'Reddit',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
  {
    name: 'Skype',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Skype`,
    active: false,
  },
  {
    name: 'Steam',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Steam`,
    active: false,
  },
  {
    name: 'Telegram',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
  {
    name: 'Mastodon',
    href: 'https://github.com/satnaing/astro-paper',
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
];

export const HERO_INTRO = '';
