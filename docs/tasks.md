# Headless UI 디자인 시스템 라이브러리 개발 Task

## 초기 설정 및 환경 구성 (Setup)
- [x] 프로젝트 초기화 (React, TypeScript, Vite)
- [x] 테스트 환경 구성 (Vitest, React Testing Library, @testing-library/user-event)
- [x] Storybook 설치 및 설정
- [x] Tailwind CSS (또는 Vanilla Extract) 설치 및 설정
- [x] 기본 디렉토리 구조 및 Alias 설정

## 핵심 컴포넌트 개발 (Core Components)

### Dropdown / Select
- [x] [Dropdown] 테스트 작성 (기본 UI, 상태 관리, 키보드 네비게이션)
- [x] [Dropdown] 기본 UI 구조 및 Trigger 구현
- [x] [Dropdown] 메뉴 표시/숨김 로직 구현 (Open/Close State)
- [x] [Dropdown] 키보드 접근성 구현 (Arrow Up/Down, Enter, Esc)
- [x] [Dropdown] Storybook 문서화

### Modal / Dialog
- [x] [Modal] 테스트 작성 (Portal, Focus Trap, 키보드 이벤트, ARIA 속성)
- [x] [Modal] Portal 기반 Overlay 구현
- [x] [Modal] Focus Trap (포커스 가두기) 구현
- [x] [Modal] Esc 키 닫기 및 접근성 속성 적용
- [x] [Modal] Framer Motion 진입/이탈 애니메이션 적용
- [x] [Modal] Storybook 문서화

### Tabs
- [x] [Tabs] 테스트 작성 (상태 관리, 키보드 네비게이션, ARIA 속성)
- [x] [Tabs] Compound Component 구조 설계 (Root, List, Trigger, Content)
- [x] [Tabs] 활성 탭 상태 관리 로직
- [x] [Tabs] 키보드 네비게이션 (Left/Right Arrow)
- [x] [Tabs] Storybook 문서화

### Accordion
- [x] [Accordion] 테스트 작성 (상태 관리, 다중/단일 선택, ARIA 속성)
- [x] [Accordion] 항목 확장/축소 상태 관리
- [x] [Accordion] 다중 선택/단일 선택 옵션 구현
- [x] [Accordion] WAI-ARIA 속성 적용 (`aria-expanded`, `aria-controls`)
- [x] [Accordion] Framer Motion 높이 애니메이션 적용

### Toast / Notification
- [x] [Toast] 테스트 작성 (Provider, 타이머, 스크린 리더, 애니메이션)
- [x] [Toast] Toast Provider 및 Context 구현
- [x] [Toast] 자동 사라짐 타이머 로직
- [x] [Toast] 스크린 리더 알림 처리 (Assertive/Polite)
- [x] [Toast] 애니메이션 및 위치 선정 로직

### Switch / Toggle
- [ ] [Switch] 테스트 작성 (상태 제어, 키보드 조작, ARIA 속성)
- [ ] [Switch] On/Off 상태 제어 로직
- [ ] [Switch] 키보드 조작 및 접근성 라벨링

### Tooltip
- [ ] [Tooltip] 테스트 작성 (이벤트 핸들링, 위치 계산, ARIA 속성)
- [ ] [Tooltip] Hover/Focus 이벤트 핸들링
- [ ] [Tooltip] 위치 계산 (Positioning) 로직
- [ ] [Tooltip] 접근성 (`aria-describedby`) 적용

## 문서화 및 배포 (Docs & Deploy)
- [ ] README.md 작성 (설치 및 사용법)
- [ ] Storybook 배포 (Vercel/Netlify 등)
- [ ] 최종 접근성 점검 (Lighthouse, Screen Reader)
