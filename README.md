# 탈까 서비스 FE 파트

사내 법인 차량을 주말, 공휴일에 사용하기를 원하는 사람들에게 공정하게 배분하기 위한 서비스 입니다.

[https://yamfubao.shop/](https://yamfubao.shop/)

## 요구 사항

이 프로젝트는 React와 TypeScript를 사용하여 Vite로 설정된 프로젝트입니다.

이 프로젝트를 실행하려면 아래의 프로그램들이 필요합니다:

- [Node.js](https://nodejs.org/) (최소 버전 14 이상)
- [npm](https://www.npmjs.com/) 패키지 매니저

## 설치 및 실행

### 1. 프로젝트 클론

Git을 사용하여 이 저장소를 로컬 머신에 클론합니다:

```bash
git clone https://github.com/KEA-ENTER/ENTER-FE.git
```

### 2. 종속성 설치

프로젝트 디렉토리로 이동한 후, npm을 사용하여 필요한 종속성을 설치합니다:

```bash
cd ENTER-FE
npm install
```

### 3. 환경 변수 설정

이 프로젝트는 환경 변수 설정이 필요합니다. 루트 디렉토리에 `.env` 파일을 생성하고 필요한 값을 설정하세요.

```bash
VITE_SERVER_URL = https://moaboa.shop
```

### 4. 개발 서버 실행
아래 명령어를 실행하여 개발 서버를 시작합니다:

```bash
npm run dev
```

## 프로젝트 구조

- public/: 이미지, 폰트 등의 정적 리소스를 저장한 디렉토리
- src/: 주요 소스 코드가 위치한 디렉토리
  - API/: API 연결
  - components/: react 컴포넌트
  - pages/: 주요 페이지 구성
- .eslintrc.cjs: ESLint 설정 파일
- tsconfig.json: TypeScript 설정 파일
- vite.config.ts: Vite 설정 파일
---

가천대학교 SW아카데미 4기 기업실무프로젝트 6조 - Enter