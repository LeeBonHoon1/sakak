# Sakak - 건강검진 조회 시스템

건강검진 결과를 조회하고 건강 상태를 분석할 수 있는 웹 애플리케이션입니다.

## 🚀 실행 방법

### 필수 요구사항

- pnpm (권장) 또는 npm, yarn

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 🛠 기술 스택

### 프레임워크 & 라이브러리

- **Next.js 16** - React 프레임워크 (App Router)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성

### 상태 관리

- **Zustand** - 클라이언트 상태 관리
  - `persist` 미들웨어를 사용하여 localStorage에 상태 저장
  - 사용자 인증 정보 및 건강검진 데이터 영구 저장
- **TanStack Query** - 서버 상태 관리 및 데이터 페칭
  - `mutationOptions`를 사용하여 재사용 가능한 mutation 옵션 정의
  - 컴포넌트 간 일관된 API 호출 로직 공유

### 스타일링

- **Tailwind** - 유틸리티 기반 CSS 프레임워크
- **Framer Motion** - 애니메이션 라이브러리

### 폼 관리 & 검증

- **React Hook Form** - 클라이언트 사이드 폼 상태 관리 (건강검진 조회 폼)
- **React useActionState & useFormStatus** - 서버 사이드 폼 검증 (로그인 폼)
- **Zod** - 스키마 검증
- **역할 분리**: 서버는 검증에 집중하고, 클라이언트는 UI에 집중

### 차트 & 시각화

- **Recharts 2.15.4** - 차트 라이브러리

### 주요 패턴

- **Feature-based 구조**: 기능별로 모듈화된 구조
- **Server/Client Components 분리**: Next.js App Router 패턴 준수
- **컴포넌트 분리**: 재사용 가능한 컴포넌트 구조

```
sakak/
├── app/                    # Next.js App Router 페이지
│   ├── dashboard/         # 대시보드 관련 페이지
│   ├── login/             # 로그인 페이지
│   └── api/               # API 라우트
├── components/             # 공통 UI 컴포넌트
│   └── ui/                # shadcn/ui 컴포넌트
├── features/              # 기능별 모듈
│   ├── auth/              # 인증 관련
│   ├── checkup/           # 건강검진 입력/제출
│   ├── checkup-charts/    # 건강검진 차트 및 시각화
│   └── checkup-list/      # 검진 결과 리스트
├── shared/                # 공유 컴포넌트 및 상수
│   ├── components/        # 공유 컴포넌트 (Sidebar, Header 등)
│   └── constants/         # 공유 상수
├── lib/                   # 유틸리티 함수
└── providers/             # React Context Providers
```

## ✨ 주요 기능

### 1. 건강검진 조회

건강검진 조회는 8단계로 구성된 다단계 폼으로 진행됩니다

**React Context를 통한 Step 상태 관리**: `CheckupFormContext`를 사용하여 다단계 폼의 현재 단계, 이전 단계, 폼 상태 등을 하위 컴포넌트 간 공유

#### 입력 단계 (1-4단계)

각 단계마다 Zod schema로 유효성 검증을 수행합니다

1. **기본 정보 입력**

   - 이름 (로그인 사용자 정보 자동 입력)
   - 생년월일 (YYYYMMDD 형식)
   - 전화번호 (숫자만 입력)

2. **통신사 선택**

   - SKT, KT, LG U+ 중 선택
   - 필수 선택 검증

3. **조회 기간 설정**

   - 조회 시작 연도 (YYYY 형식)
   - 조회 종료 연도 (YYYY 형식)

4. **조회 타입 선택**
   - 조회 구분 선택
   - 간편인증 로그인 구분 선택

#### 처리 단계 (5-8단계)

5. **조회 중**

   - API 호출 및 데이터 처리 중 로딩 상태 표시

6. **본인인증 필요** (선택적)

   - 본인인증이 필요한 경우 표시
   - 본인인증 완료 후 계속 진행

7. **조회 실패**

   - 조회 실패 시 에러 메시지 표시
   - 다시 시도 기능 제공

8. **조회 완료**
   - 조회 성공 시 완료 메시지 표시
   - 결과 데이터를 스토리지에 저장

### 2. 건강 상태 분석

- 건강 상태 요약 차트 (파이 차트)
- 검사 항목별 상태 그리드
- 정상/주의/위험 상태 분류 및 시각화

### 3. 검진 결과 관리

- 검진 결과 리스트 조회
- 검진 개요 정보 표시
- 검진 이력 관리

### 4. 반응형 디자인

- 모바일/태블릿/데스크톱 지원
- 반응형 사이드바 (모바일에서 헤더 메뉴로 제어)
- 반응형 그리드 레이아웃

### 5. 사용자 인증

- 로그인/로그아웃
- **서버 사이드 검증**: React의 `useActionState`와 `useFormStatus`를 사용하여 서버 액션에서 Zod 스키마로 폼 데이터 검증
- **localStorage 기반 상태 유지**: 프로젝트 특성상 Zustand persist 미들웨어를 사용하여 사용자 정보와 건강검진 데이터를 localStorage에 저장하여 페이지 새로고침 후에도 상태 유지

## 📝 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_BASE_URL=your_api_base_url
NEXT_PUBLIC_API_KEY=your_api_key
```
