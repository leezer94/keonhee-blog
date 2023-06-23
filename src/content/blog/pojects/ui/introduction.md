---
author: Keonhee Lee
pubDatetime: 2023-06-23T03:06:00Z
title: Building UI Component
postSlug: project-introduction
featured: true
draft: false
tags:
  - shadcn/ui
  - radix UI
  - tailwind
  - monorepo
  - nextJS
  - ui components
description: Building UI Component
---

# Introduction

---

`Next.js 13 버전`을 공부하면서 알게된 `재사용 가능한 컴포넌트 모음`이라는 아이덴티티 를 가지고 있는 오픈소스인 `shadcn/ui` 를 알게 되었다.

장점으로는 라이브러리가 Next.js 에서의 서버 컴포넌트와 클라이언트 컴포넌트의 호환성이 좋으며, 컴포넌트 자체를 패키지 install 하는 방식으로 이전의 잘 구성된 디자인 시스템들이나, UI 컴포넌트 라이브러리들에 비해 확장성에서 장점을 가지고 있는것 같았다.

이전의 부트캠프에서의 프로젝트 개인적인 사이드 프로젝트를 진행하면서 매번 단발성으로 끝나는 것에 대한 회의감을 어느정도 느끼던 와중에 `지속적인 / 유지보수 가능한 프로젝트`를 구성해보자는 생각을 하게 되어 구상을 시작했다.

프로젝트의 개념으로 `shadcn/ui` 라이브러리가 어떻게 패키지 구성이 되어있는지 알아보고, 나 또한 비슷한 개념의 패키지를 구성해 배포하는것이 목표이다.

---

## 프로젝트의 구성 ( 2023/06/23 기준 )

먼저, 나는 [shadcn/ui 라이브러리](https://github.com/shadcn/ui)를 레퍼런스로 삼고 프로젝트를 시작했기 때문에, 라이브러리에 대한 분석이 필요하다고 보았다.

`키워드` 별로 나누어 프로젝트의 구성을 살펴 보자면,

---

## Monorepos

[Turborepo](https://turbo.build/repo/docs) 기반으로 모노레포를 구성했다.

`shadcn/ui` 에서는 UI component library 가 아니라 재사용 가능한 컴포넌트의 모음 이라고 설명하지만, UI component library 의 개념에서 document 를 제공할 수 있는 `웹 프로젝트`와 `패키지`를 같은 레포지토리에 공유하고 있으니 같은 패키지를 사용할 가능성이 클 수 밖에 없다.

이 점에서 모노레포로 구성했다고 생각할 수 있을것 같다.

---

## TailwindCSS

**[NextJS CSS in JS](https://nextjs.org/docs/app/building-your-application/styling/css-in-js)**

최근의 프론트엔드 생태계에서 `server component` / `client component` 의 구분이 확실해지고, 물론 리액트에서 있는 개념이지만, nextJS 13 버전 에서도 상단에 `'use client'` 를 명시해주며 클라이언트 로직을 담고 있는 컴포넌트와 서버에서 가져오는 컴포넌트의 분리를 진행하고 있다.

나의 경우에도 그러했고, 이전의 프로젝트에서도 `styled-components` / `emotions` 와 같은 런타임에서 실행되는 CSS in JS 를 자주 사용했고, 경험 또한 나쁘지 않았다.

하지만, 여기서 현재 ( v 13.4 ) 까지는 서버 컴포넌트와의 호환성의 관점에서 런타임이 필수적인 `CSS in JS` 라이브러리들은 appDir 이 stable 해져 마이그레이션이 진행되는 상태에서는 레거시가 될 수도 있다.

![Screenshot 2023-06-22 at 12.05.19 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3661b10f-8a42-4571-a6bf-b1526ddcf7c6/Screenshot_2023-06-22_at_12.05.19_PM.png)

여기서 `TailwindCSS` 가 가지는 장점이라면, NextJS 의 경우에 turpopack 과의 호환성이 좋으며, `zero-runtime` 을 표방하고 있기 때문에 서버 컴포넌트와의 호환성에서도 이점을 가지고 있다.

개인적인 느낌으로는 처음 TailwindCSS 를 접했을 때 `className` 으로 스타일링이 늘어지는 것에 대한 어느정도 의 지저분함 ? 이 있다고 생각했고, 가독성도 좋지 않다고 생각했었는데 지금은 따로 분리된 CSS 관련 파일을 따로 보는것 보다는 직관적으로 보인다고 생각하기도 한다.

물론 애니메이션을 적용하는 측면에서 단점이 있다고는 하지만, 그에 대응 하는 플러그인들도 많이 존재하는것 처럼 보인다.

---

## Radix UI / Aria Design System

`Radix UI` 는 Primitive ( 원시적인 ) UI 컴포넌트를 제공해줘 높은 퀄리티의 디자인 시스템을 구축 할 수 있게 해 주는 라이브러리 이다.

`shadcn/ui` 라이브러리 에서도 마찬가지로 Radix UI 를 사용한 이유가 여기에 있을 것 이다.

기본적인 UI component 의 프레임은 제공 해 주지만 확장성을 가지고, 스타일링또한 자유롭다.

Radix UI 는 [WAI-ARIA 의 디자인 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/)을 참고하여 컴포넌트를 구성했기 때문에, 더욱이 `sementic` 한 ui 를 구성하는데 도움을 받을 수 있다.

---

## TypeScript

최근의 프로젝트 / 오픈소스에서 타입스크립트는 기본이다. 이전의 라이브러리들은 자바스크립트로 구현되었었고, 이후에 타입스크립트로 마이그레이션 되었거나, 타입모음을 의존성에 추가해 주어야 하는 일이 잦았었다.

타입스크립트로 구성된 라이브러리는 더 안전하고, 사용성도 좋다고 보여진다.

---

## Changeset

모노레포로 구성하면서 변경사항의 로그 등이나, 버전을 관리해주는 툴 따위로 생각하면 좋을 것 같다.

버전 / 로그 관리는 [changeset](https://github.com/changesets/changesets) 에 맡기고 모노레포에 더 포거싱을 할 수 있게 도와주는.

---

## husky

이전의 프로젝트에서도 사용해 봤지만, git push 이전의 커밋린터라고 생각해고 사용했었다.

변경사항을 git 에 commit 하게되면, 설정된 workflow 를 거치고 통과하게 되면 git commit 을 수행한다.

---

간단하게 `shadcn/ui` 라이브러리의 프로젝트 구성을 살펴 보았고,

나 또한 비슷한 구성으로 프로젝트를 진행할 계획이다.

좀더 다른 스타일링과, 애니메이션 가능하다면, 복잡한 애니메이션은 framer-motion 라이브러리 이용해 를 구성해 보고 싶기도 하다.
