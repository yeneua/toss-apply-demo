# Test-Driven Development (TDD) 가이드

## 원칙
이 프로젝트는 **Test-Driven Development (TDD)** 방식으로 개발합니다.

## 개발 프로세스

### 1. Red (실패하는 테스트 작성)
- 구현하려는 기능에 대한 테스트를 **먼저** 작성합니다.
- 테스트는 당연히 실패해야 합니다 (아직 구현이 없으므로).
- 테스트는 명확하고 구체적인 요구사항을 반영해야 합니다.

### 2. Green (테스트를 통과하는 최소한의 코드 작성)
- 테스트를 통과시키기 위한 **최소한의 코드**만 작성합니다.
- 완벽한 코드가 아니어도 괜찮습니다.
- 테스트가 통과하는 것이 목표입니다.

### 3. Refactor (코드 개선)
- 테스트가 통과한 후, 코드를 개선합니다.
- 중복 제거, 가독성 향상, 성능 최적화 등을 수행합니다.
- 리팩토링 후에도 **모든 테스트가 통과**해야 합니다.

## 테스트 작성 가이드

### 단위 테스트 (Unit Tests)
- 각 함수, 메서드, 컴포넌트를 독립적으로 테스트합니다.
- 외부 의존성은 Mock 또는 Stub으로 대체합니다.
- **Given-When-Then** 패턴을 사용합니다:
  ```typescript
  describe('ComponentName', () => {
    it('should do something when condition', () => {
      // Given: 초기 상태 설정
      const initialState = { ... };
      
      // When: 테스트할 동작 실행
      const result = performAction(initialState);
      
      // Then: 예상 결과 검증
      expect(result).toBe(expectedValue);
    });
  });
  ```

### 컴포넌트 테스트
- **React Testing Library**를 사용하여 사용자 관점에서 테스트합니다.
- 구현 세부사항이 아닌 **동작(behavior)**을 테스트합니다.
- 접근성(a11y)을 고려한 쿼리를 사용합니다 (`getByRole`, `getByLabelText` 등).

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Dropdown Component', () => {
  it('should open menu when trigger is clicked', async () => {
    // Given
    render(<Dropdown><DropdownTrigger>Open</DropdownTrigger></Dropdown>);
    const user = userEvent.setup();
    
    // When
    await user.click(screen.getByRole('button', { name: 'Open' }));
    
    // Then
    expect(screen.getByRole('menu')).toBeVisible();
  });
});
```

### 접근성 테스트
- WAI-ARIA 속성이 올바르게 적용되었는지 테스트합니다.
- 키보드 네비게이션이 정상 작동하는지 테스트합니다.
- 스크린 리더가 올바르게 읽을 수 있는지 확인합니다.

```typescript
it('should have proper ARIA attributes', () => {
  render(<Modal open={true}>Modal Content</Modal>);
  
  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(dialog).toHaveAttribute('aria-labelledby');
});
```

### 통합 테스트 (Integration Tests)
- 여러 컴포넌트나 모듈이 함께 작동하는지 테스트합니다.
- 실제 사용자 시나리오를 반영합니다.

## 테스트 커버리지 목표
- 핵심 비즈니스 로직: **100%** 커버리지
- UI 컴포넌트: 주요 상호작용과 접근성 **80%+** 커버리지
- 유틸리티 함수: **100%** 커버리지

## 테스트 도구
- **Vitest**: 단위 테스트 및 통합 테스트 프레임워크
- **React Testing Library**: React 컴포넌트 테스트
- **@testing-library/user-event**: 사용자 상호작용 시뮬레이션
- **@testing-library/jest-dom**: DOM 매처 확장

## 테스트 명명 규칙
- 테스트 파일: `*.test.tsx` 또는 `*.spec.tsx`
- 테스트 설명: `should [expected behavior] when [condition]`
- 예시: `should close modal when Escape key is pressed`

## 커밋 규칙
각 기능 구현 시 다음 순서로 커밋합니다:

1. **테스트 작성 커밋**
   ```
   test: add tests for Dropdown component
   
   - Test trigger click behavior
   - Test keyboard navigation
   - Test ARIA attributes
   ```

2. **구현 커밋**
   ```
   feat: implement Dropdown component
   
   - Add basic dropdown structure
   - Implement open/close logic
   - Add keyboard navigation support
   ```

3. **리팩토링 커밋 (필요시)**
   ```
   refactor: improve Dropdown code structure
   
   - Extract common logic to hooks
   - Simplify state management
   ```

## 테스트 실행 명령어
```bash
# 모든 테스트 실행
npm run test

# Watch 모드로 테스트 실행
npm run test:watch

# 커버리지 리포트 생성
npm run test:coverage

# UI 모드로 테스트 실행 (Vitest UI)
npm run test:ui
```

## Best Practices
1. **테스트는 독립적이어야 합니다** - 각 테스트는 다른 테스트에 의존하지 않아야 합니다.
2. **테스트는 빠르게 실행되어야 합니다** - 느린 테스트는 TDD 사이클을 방해합니다.
3. **테스트는 읽기 쉬워야 합니다** - 다른 개발자가 쉽게 이해할 수 있어야 합니다.
4. **실패 메시지는 명확해야 합니다** - 무엇이 잘못되었는지 쉽게 파악할 수 있어야 합니다.
5. **Edge Case도 테스트합니다** - 정상 케이스뿐만 아니라 예외 상황도 테스트합니다.
