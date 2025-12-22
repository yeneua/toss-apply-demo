---
marp: true
theme: default
paginate: true
backgroundColor: #fff
style: |
  section {
    font-family: 'Pretendard', sans-serif;
  }
  h1 {
    color: #3182f6;
  }
  strong {
    color: #3182f6;
  }
---

# **Headless UI** Design System Library
## 로직은 견고하게, 스타일은 자유롭게

---

# 1. 프로젝트 개요

### **목표**
로직은 견고하게 유지하면서, 스타일은 자유롭게 입힐 수 있는 고품질의 **"Headless UI"** 디자인 시스템 라이브러리 구축

### **핵심 철학**
- **Headless:** 로직과 스타일을 분리하여 최대의 커스터마이징 가능성 보장
- **Accessibility (접근성):** 스크린 리더/키보드 네비게이션을 위한 완벽한 WAI-ARIA 지원
- **DX (개발자 경험):** 직관적인 API와 높은 추상화 수준 제공

---

# What is Headless UI?

### **정의**
- 기능(Functionality)과 상태(State)만 제공하고, **스타일(Style)은 제공하지 않는** UI 라이브러리
- _(예: Radix UI, React Aria, Headless UI)_

### **기존 UI 라이브러리와의 차이점**
- **기존 (MUI, AntD):** 스타일이 강력하게 결합되어 있어 커스터마이징이 어렵고 무거움
- **Headless:** 마크업과 스타일을 개발자가 **100% 제어** 가능

### **왜 필요한가?**
1. **완벽한 디자인 자유도:** 우리만의 디자인 시스템 구축 용이
2. **가벼운 번들 사이즈:** 불필요한 스타일 코드 제거
3. **접근성(a11y) 해결:** 복잡한 ARIA 패턴과 키보드 인터랙션을 라이브러리에 위임

---

# 2. 목표 및 성공 지표

### **목표**
- **5~7개**의 재사용 가능한 Headless 컴포넌트 개발
- **Compound Component Pattern** 제공
- **웹 접근성 표준(WAI-ARIA)** 엄격 준수

### **성공 지표**
- **유연성:** 다양한 스타일링 엔진(Tailwind, CSS-in-JS)과 결합 용이
- **사용성:** 직관적인 Prop 네이밍 및 API 구조
- **접근성:** LightHouse 100% 및 스크린 리더 음성 안내 지원
- **인터랙션:** Framer Motion을 활용한 고품질 마이크로 인터랙션

---

# 3. 기술 스택

| 구분 | 기술 | 선정 이유 |
| :--- | :--- | :--- |
| **프레임워크** | **React, TypeScript** | 업계 표준, 안정적인 타입 시스템 |
| **스타일링** | **Tailwind / Vanilla Extract** | Zero-runtime, 유틸리티 우선 접근 |
| **빌드/문서** | **Storybook** | 컴포넌트 시각적 테스트 및 문서화 |
| **애니메이션** | **Framer Motion** | 자연스러운 인터랙션 구현 |
| **패턴** | **Headless UI** | 스타일 제약 없는 로직 재사용 |

---

# 4. 주요 기능 (1/2)

### **Headless 컴포넌트 (5~7종)**
1. **Dropdown / Select:** 복잡한 포커스 관리
2. **Modal / Dialog:** Focus Trapping, 접근성 레이어
3. **Tabs:** 키보드 방향키 이동
4. **Accordion:** 펼치기/접기 ARIA 속성
5. **Toast:** 자동 사라짐, Assertive 안내
6. **Switch / Toggle:** 상태 관리 및 라벨링
7. **Tooltip:** 위치 계산 및 호버 감지

---

# 4. 주요 기능 (2/2)

### **고도화된 상태 관리**
- **Compound Component Pattern** 적용 (Context API 활용)
```tsx
<Select.Root>
  <Select.Trigger />
  <Select.Content>
    <Select.Item value="1">옵션 1</Select.Item>
  </Select.Content>
</Select.Root>
```

### **웹 접근성 & 애니메이션**
- **WAI-ARIA:** 키보드 네비게이션, Focus Trapping, ARIA 속성 자동 적용
- **Framer Motion:** `AnimatePresence`, `layoutId`, Spring 물리 효과

---

# 5. 개발 로드맵

1. **초기 설정:** React, TS, Storybook, Linter
2. **프로토타이핑:** 기본 요소 구현 (`Box`, `Portal`)
3. **구현:** 핵심 컴포넌트 순차 개발 (로직 → 접근성 → 애니메이션)
4. **문서화:** Storybook 사용 가이드 작성
5. **검토:** 추상화 레벨 및 편의성 검증

---

# 6. 타겟 독자

### **주요 독자**
- 빠른 개발 속도와 스타일 커스터마이징을 모두 원하는 **프론트엔드 개발자**

### **평가자**
- React 동작 원리, 합성 컴포넌트, 웹 접근성 역량을 검증하려는 **면접관/시니어 개발자**

---

# 감사합니다
