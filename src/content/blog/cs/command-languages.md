---
author: Keonhee Lee
pubDatetime: 2023-03-11T14:30:00Z
title: Source Code and Commands
postSlug: source-code-and-command
featured: true
draft: false
tags:
  - CS
description: 혼자 공부하는 컴퓨터 구조 / 운영체제 책읽고 정리
---

## Chapter 3

---

### 저수준 언어와 고 수준 언어 ( high level / low level )

프로그래밍 언어는 크게 사람의 이해도에 따라 두가지 분류로 나눌수 있다.
Compiled languages 와 Interpreted languages 와 위 두가지 저급언어 고급언어 를 혼동하지 말아야겠다.

- 고급 언어 ( 사람을 위한 언어 )

  - Javascript
  - Python
  - Java
    ...

- 저급 언어 ( 컴퓨터가 직접 이해하고 실행할 수 있는 언어 )
  - 기계어 ( 이진수 혹은 16진수로 이루어져 있다 )
  - 어셈블리어 ( 기계어를 읽기 편한 형태로 번역한 언어 )
  - C
    ...

---

### 컴파일 언어와 인터프리터 언어 ( Compiled language / Interpreted language)

- 컴파일 언어 ( Compiled language )

  - 컴파일러에 의해 `소스코드가 전체가 저급 언어로 변환되어 실행되는 고급 언어`.
  - 이 과정을 컴파일이라 하며, 이를 수행해주는 도구를 컴파일러라고 한다.
  - 컴파일링의 과정에서 소스 코드 내의 오류를 하나라도 발견하면 해당 소스코드는 컴파일에 실패한다.
  - 컴파일이 성공적으로 수행되어 저급언어로 변환된 코드를 `목적코드`라고 한다.

- 인터프리터 언어 ( Interpreted language )

  - 인터프리터에 의해 소스코드가 한줄씩 실행되는 고급언어
  - 도구를 일컷는 말이 인터프리터
  - 소스코드를 한줄씩 실행하기 때문에, 소스코드 전체를 저급 언어로 변환하는 시간을 기다릴필요가 없다. ( 변환 속도가 빠르다는 말이 아니다. )
  - N번째 줄에 문법오류가 있더라도 N-1번째 줄 까지는 올바르게 수행됩니다.

`일반적으로 interpreted language 는 compiled language 보다 느리다.`

컴파일 언어와 인터프리터 언어를 칼로 자르듯이 구분하기 보다는

`고급언어가 저급언어로 변환되는 대표적인 방법에 컴파일 방식과 인터프리팅 방식이 있다.` 로 이해하는것이 좋다.

---

### 목적 파일 vs 실행 파일

목적코드로 이루어진 파일을 목적 파일 , 실행코드로 이루어진 파일을 실행파일이라 부른다.

목적 파일이 실행 파일이 되기 위해서는 `링킹(linking)` 이라는 작업을 거쳐야 하는데,
