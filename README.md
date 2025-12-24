# Headless UI System 🎨

**"로직과 스타일의 완벽한 분리"**

React와 Tailwind CSS를 기반으로 한 고성능, 접근성(Accessibility) 중심의 Headless UI 라이브러리입니다.
스타일은 자유롭게 커스터마이징하면서, 복잡한 UI 로직과 WAI-ARIA 접근성 가이드를 완벽하게 준수하는 컴포넌트를 제공합니다.

## ✨ Features

- **Headless Design**: 스타일이 적용되지 않은 순수 로직 컴포넌트 제공 (원하는 대로 스타일링 가능)
- **Accessible (a11y)**: WAI-ARIA 패턴 완벽 준수 (스크린 리더 및 키보드 네비게이션 지원)
- **TypeScript**: 완전한 타입 안전성 제공
- **Compound Components**: 유연한 합성 컴포넌트 패턴 사용
- **Animation Ready**: Framer Motion 등을 활용한 손쉬운 애니메이션 적용

## 📦 Installation

```bash
npm install toss-apply-demo
# or
yarn add toss-apply-demo
```

> **Note**: This project requires React 18+ and supports Tailwind CSS for styling.

## 🚀 Usage

### 1. Toast (알림)

```tsx
import { ToastProvider, useToast } from 'toss-apply-demo';

function App() {
  return (
    <ToastProvider>
      <YourComponent />
    </ToastProvider>
  );
}

function YourComponent() {
  const { toast } = useToast();

  return (
    <button onClick={() => toast({ title: 'Success', description: 'Action Completed!' })}>
      Show Toast
    </button>
  );
}
```

### 2. Switch (토글)

```tsx
import { Switch } from 'toss-apply-demo';
import { useState } from 'react';

function ToggleSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch 
      checked={enabled} 
      onCheckedChange={setEnabled} 
      aria-label="Airplane mode"
    />
  );
}
```

### 3. Tooltip (툴팁)

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from 'toss-apply-demo';

function MyTooltip() {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger className="btn">Hover me</TooltipTrigger>
      <TooltipContent side="top">
        This is a helpful tip!
      </TooltipContent>
    </Tooltip>
  );
}
```

### 4. Modal (모달), Tabs (탭), Accordion (아코디언)
> *각 컴포넌트의 상세 문서는 Storybook을 참고하세요.*

## 🛠 Development

```bash
# Install dependencies
npm install

# Start development server (Demo App)
npm run dev

# Run tests
npm test

# Start Storybook
npm run storybook
```

## 🏗 Implemented Components

| Component | Status | Features |
|-----------|--------|----------|
| **Dropdown** | ✅ Ready | Accessible menu, keyboard nav |
| **Modal** | ✅ Ready | Focus trap, accessible dialog |
| **Tabs** | ✅ Ready | Keyboard navigation (Roving tabindex) |
| **Accordion** | ✅ Ready | Single/Multiple expand, animation |
| **Toast** | ✅ Ready | Auto-dismiss, stackable |
| **Switch** | ✅ Ready | Toggle logic, framer-motion animation |
| **Tooltip** | ✅ Ready | Smart positioning, delayed hover |

## 🤝 Contributing

Contributions are welcome! Please read our contributing guide before submitting a PR.
