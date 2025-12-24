# Headless UI Library - Usage Guide 📘

이 문서는 `toss-apply-demo` 라이브러리의 핵심 개념과 각 컴포넌트별 상세 사용법을 다룹니다.

## 🌟 Core Concepts

### 1. Headless UI란?
스타일이 입혀져 있지 않은 **순수 로직 컴포넌트**입니다.
제공되는 컴포넌트는 오직 **기능(Functionality)**과 **접근성(Accessibility)**만을 담당하며, 디자인은 여러분이 원하는 대로 `className` 등을 통해 입힐 수 있습니다.

### 2. Composition (합성)
대부분의 컴포넌트는 유연성을 위해 **Compound Component** 패턴을 사용합니다.
(예: `Tabs` = `Tabs.Root` + `Tabs.List` + `Tabs.Content`)

---

## 🧩 Components Guide

### 1. Toast (알림 메시지)
화면 귀퉁이에 일시적으로 나타나는 알림입니다. 앱 최상위에서 `ToastProvider`로 감싸야 합니다.

```tsx
import { ToastProvider, useToast } from 'toss-apply-demo';

// 1. Wrap your app
function App() {
  return (
    <ToastProvider>
      <MainPage />
    </ToastProvider>
  );
}

// 2. Use hook to trigger toast
function MainPage() {
  const { toast } = useToast();

  return (
    <button 
      className="btn"
      onClick={() => toast({ 
        title: '저장 완료', 
        description: '성공적으로 저장되었습니다.',
        variant: 'success' 
      })}
    >
      저장하기
    </button>
  );
}
```

### 2. Switch (토글 스위치)
설정을 켜고 끄는 직관적인 스위치입니다.

```tsx
import { Switch } from 'toss-apply-demo';
import { useState } from 'react';

function AirplaneMode() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Switch 
        checked={enabled} 
        onCheckedChange={setEnabled}
        aria-label="비행기 모드"
        className="data-[state=checked]:bg-blue-600" 
      />
      <label>{enabled ? 'ON' : 'OFF'}</label>
    </div>
  );
}
```

### 3. Tooltip (툴팁)
마우스 오버나 포커스 시 부가 설명을 보여줍니다.

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from 'toss-apply-demo';

function IconButton() {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <button className="icon-btn">ℹ️</button>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-black text-white p-2 rounded">
        추가 정보 보기
      </TooltipContent>
    </Tooltip>
  );
}
```

### 4. Dropdown (드롭다운 메뉴)
클릭 시 메뉴 목록을 보여줍니다.

```tsx
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from 'toss-apply-demo';

function UserMenu() {
  return (
    <Dropdown>
      <DropdownTrigger className="btn">내 계정</DropdownTrigger>
      <DropdownContent className="menu-box">
        <DropdownItem onSelect={() => console.log('Profile')}>프로필</DropdownItem>
        <DropdownItem onSelect={() => console.log('Settings')}>설정</DropdownItem>
        <div className="divider" />
        <DropdownItem onSelect={() => console.log('Logout')} variant="danger">로그아웃</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
```

### 5. Modal (모달 대화상자)
사용자의 주의를 집중시키는 대화상자입니다.

```tsx
import { Modal, ModalTrigger, ModalContent, ModalTitle, ModalDescription, ModalClose } from 'toss-apply-demo';

function DeleteConfirm() {
  return (
    <Modal>
      <ModalTrigger className="btn-danger">삭제</ModalTrigger>
      <ModalContent className="modal-box">
        <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
        <ModalDescription>이 작업은 되돌릴 수 없습니다.</ModalDescription>
        <div className="flex justify-end gap-2 mt-4">
          <ModalClose className="btn-secondary">취소</ModalClose>
          <button className="btn-danger" onClick={handleDelete}>확인</button>
        </div>
      </ModalContent>
    </Modal>
  );
}
```

### 6. Tabs (탭)
콘텐츠를 여러 섹션으로 나누어 보여줍니다.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'toss-apply-demo';

function Settings() {
  return (
    <Tabs defaultValue="account">
      <TabsList className="tab-list">
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="password">비밀번호</TabsTrigger>
      </TabsList>
      <TabsContent value="account">계정 설정 화면...</TabsContent>
      <TabsContent value="password">비밀번호 변경 화면...</TabsContent>
    </Tabs>
  );
}
```

### 7. Accordion (아코디언)
내용을 접고 펼칠 수 있는 목록입니다.

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'toss-apply-demo';

function FAQ() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>환불 정책은 어떻게 되나요?</AccordionTrigger>
        <AccordionContent>구매 후 7일 이내에 가능합니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>배송 기간은 얼마나 걸리나요?</AccordionTrigger>
        <AccordionContent>평균 2-3일 소요됩니다.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```
