---
author: Keonhee Lee
pubDatetime: 2023-03-11T12:06:00Z
title: About Computer Structure
postSlug: about-computer-structure
featured: false
draft: false
tags:
  - CS
description: 혼자 공부하는 컴퓨터 구조 / 운영체제 책읽고 정리
---

## Chapter 1

---

### 컴퓨터 구조를 알아야 하는 이유

- 컴퓨터 구조를 이해하고 있다면, `문제 상황을 빠르게 진단`할 수 있고, `문제해결의 실마리`를 다양하게 찾을 수 있다.

- 개발을 하는데 필요한 `성능`, `용량`, `비용` 까지의 고려는 프로그래밍 언어의 공부 만으로 해결하기 어렵다.

---

### 컴퓨터 구조의 큰 그림

컴포터 구조의 큰 지식은 크게 두가지로 나뉘게 된다.

![computer-structure](/public/assets/cs1.png '컴퓨터구조 의 큰 그림')

- 컴퓨터가 이해하는 정보
- 컴퓨터의 네 가지 핵심 부품

여기서 말하는 두 큰 카테고리를 세분화 해보면,

<img src='../../../../../public/assets/cs2.png' alt='computer-structure' width='70%' height='50%'/>

#### 컴퓨터가 이해하는 정보

- 데이터 ( 컴퓨터가 이해하는 숫자, 문자, 이미지, 동영상과 같은 정적인 정보 )
- 명령어 ( 데이터를 움직이고 컴퓨터틀 작동시키는 정보 )

#### 컴퓨터의 네가지 핵심 부품

- CPU ( 중앙처리장치 )
- 메모리
- 보조기억장치
- 입출력장치

---

### 컴퓨터의 핵심 부품들을 나열해서 그려본다면 ?

![computer-devices](/public/assets/cs3.png '카테고리의 세분화')

#### `메인보드`

- 아래에 서술할 모든 장치들은 메인보드에 연결이 된다.
- 마더보드라고도 불리운다.

#### `시스템 버스`

- 메인보드에 연결된 부품들이 정보를 주고받는 통로라고 볼 수 있다.
- 컴퓨터 내부에는 여러가지 버스가 있지만 언급한 핵심 부품을 연결하는 가장 중요한 통로는 시스템 버스이다.
- <b>주소 버스, 데이터 버스, 제어 버스</b> 로 구성되어 있다.

<b> 주소 버스 ( Address bus ) </b>

- 주소를 주고받는 통로

<b> 데이터 버스 ( Data bus ) </b>

- 명령어와 데이터를 주고받는 통로

<b> 제어 버스 ( Control bus ) </b>

- 제어 신호를 주고받는 통로

#### `CPU`

- CPU 는 메모리에 저장된 값을 읽어들어고, 해석하고, 실행하는 장치.
- 내부에는 <b>ALU, 레지스터, 제어장치 </b>가 있다.

<b> 산술논리연산장치 ( ALU ) </b>

- 컴퓨터 내부에서 수행되는 대부분의 계산을 담당한다.

<b> 레지스터</b>

- CPU 내부의 임시 저장 장치 / 여러개의 레지스터가 존재하고 각기 다른 이름과 역할이 있다.

<b> 제어장치 </b>

- 제어 신호를 내보내고 명령어를 해석하는 장치

#### `메모리`

- 프로그램이 `실행되기 위해서는 메모리에 저장`되어 있어야 한다.
- 메모리는 현재 실행되는 프로그램의 `명령어와 데이터를 저장`한다.
- 메모리에 저장된 값의 위치는 `주소`로 알 수 있다.

#### `보조기억장치`

- 메모리의 단점을 보완하기 위해 존재하는 장치
- 메모리보다 저장 공간이 크고, 전원이 꺼져도 저장된 내용을 잃지 않는다.

#### `입출력장치 ( 주변장치 )`

- 마이크, 스피커, 모니터, 키보드 처럼 외부에서 연결되어 내부와 정보를 교환하는 장치
- 보조기억장치도 관점에 따라서는 입출력장치라고 고려될 수 있다.