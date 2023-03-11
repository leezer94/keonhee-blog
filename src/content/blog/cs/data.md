---
author: Keonhee Lee
pubDatetime: 2023-03-11T14:06:00Z
title: How computer understand data
postSlug: computer-expression
featured: true
draft: false
tags:
  - CS
description: 혼자 공부하는 컴퓨터 구조 / 운영체제 책읽고 정리
---

## Chapter 2

---

### 정보의 단위

컴퓨터가 이해하는 정보의 단위를 테이블로 표현하자면,

| 단위               | in bundle            |
| ------------------ | -------------------- |
| 1 바이트 (1byte)   | 8 비트 (8 bit)       |
| 1 킬로바이트 (1kB) | 1000 바이트(1byte)   |
| 1 메가바이트 (1MB) | 1000 킬로바이트(1kB) |
| 1 기가바이트 (1GB) | 1000 메가바이트(1MB) |
| 1 테라바이트 (1TB) | 1000 기가바이트(1GB) |

PS. 1kB 는 1,024byte ... 로 표현하는 것은 잘못된 관습이다. 이전 단위를 1,024씩 묶어 표현한 단위는 KiB, MiB ... 이다.

### 0과 1로 문자를 표현하는 방법

컴퓨터가 인식하고 표현할 수 있는 문자의 모음을 `문자 집합`이라고 한다.

여기에는 두가지의 과정이 있는데,

#### 인코딩(encoding)

- 문자를 0 과 1 의 이진수로 표현하는 변환 과정

#### 디코딩(decoding)

- 0 과 1 로 이루어진 문자코드를 사람이 이해할 수 있는 문자로 변화하는 과정
