# Headless UI Design System Library

> **로직과 스타일의 완벽한 분리.**
> 스타일은 자유롭게 입히면서, 견고한 로직과 접근성을 갖춘 React Headless UI 라이브러리입니다.

## 📖 프로젝트 개요

이 프로젝트는 **"Headless UI"** 철학을 바탕으로 구축된 디자인 시스템 라이브러리입니다.
개발자가 스타일링의 제약 없이 비즈니스 로직과 UI 인터랙션에 집중할 수 있도록 돕습니다.

### 핵심 철학
- **🎨 Headless Architecture**: 마크업과 스타일링에 대한 의견(Opinion)을 배제하여 최대의 커스터마이징 가능성을 제공합니다.
- **♿ Accessibility (A11y)**: WAI-ARIA 표준을 준수하여 스크린 리더와 키보드 사용자 모두에게 완벽한 경험을 제공합니다.
- **✨ Micro-Interactions**: Framer Motion을 활용하여 부드럽고 "쫀득한" 사용자 경험을 선사합니다.
- **🧩 Compound Components**: 유연한 합성을 통해 다양한 UI 요구사항을 하나의 패턴으로 해결합니다.

---

## 🚀 시작하기 (Getting Started)

이 프로젝트는 데모 및 문서화 환경으로 **Storybook**을 사용합니다.

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/yeneua/toss-apply-demo.git
cd toss-apply-demo

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행 (Vite)
npm run dev

# 4. Storybook 실행 (컴포넌트 문서 확인)
npm run storybook
```

Storybook이 실행되면 `http://localhost:6006`에서 모든 컴포넌트와 문서를 확인할 수 있습니다.

---

## 🛠 기술 스택 (Tech Stack)

- **Framework**: React, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS / Vanilla Extract (User Choice)
- **Animation**: Framer Motion
- **Documentation**: Storybook
- **Package Manager**: npm

---

## 📦 제공 기능 (Feature & Components)

### Core Components
| 컴포넌트 | 설명 | 주요 특징 |
| --- | --- | --- |
| **Dropdown / Select** | 선택 메뉴 컴포넌트 | 키보드 탐색, 포커스 관리 |
| **Modal / Dialog** | 대화상자 레이어 | Focus Trap, Portal, Esc 닫기 |
| **Tabs** | 탭 네비게이션 | 키보드 방향키 이동 (Roving Tabindex) |
| **Accordion** | 접이식 목록 | 다중/단일 선택, 높이 애니메이션 |
| **Toast** | 알림 메시지 | 자동 사라짐, 접근성(ARIA Live Region) |
| **Switch / Tooltip** | 유틸리티 | 상태 토글, 위치 자동 계산 |

### Web Accessibility (WAI-ARIA)
모든 컴포넌트는 다음 접근성 기능을 기본적으로 지원합니다:
- **Keyboard Navigation**: `Tab`, `Arrow`, `Enter`, `Esc`, `Space`
- **Screen Reader Support**: `role`, `aria-*` 속성 자동 관리
- **Focus Management**: Focus Trap, Restore Focus

---

## 🤝 기여하기 (Contributing)

이 프로젝트는 현재 개발 초기 단계입니다. 버그 제보나 기능 제안은 [Issues](https://github.com/yeneua/toss-apply-demo/issues)에 등록해 주세요.

---

## 📄 License

MIT License
