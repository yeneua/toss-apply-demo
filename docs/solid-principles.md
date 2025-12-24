# SOLID 원칙 가이드

## 개요
이 프로젝트는 **SOLID 원칙**을 준수하여 유지보수 가능하고 확장 가능한 코드를 작성합니다.

---

## S - Single Responsibility Principle (단일 책임 원칙)

### 원칙
> 하나의 클래스(또는 컴포넌트, 함수)는 하나의 책임만 가져야 합니다.

### React 컴포넌트에 적용

**❌ 나쁜 예시:**
```typescript
// 하나의 컴포넌트가 너무 많은 책임을 가짐
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // 데이터 가져오기 로직
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser);
  }, []);
  
  // 데이터 검증 로직
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  // 렌더링 로직
  return (
    <div>
      {/* 복잡한 UI 로직 */}
    </div>
  );
}
```

**✅ 좋은 예시:**
```typescript
// 각 책임을 분리
// hooks/useUser.ts - 데이터 관리 책임
function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser);
  }, []);
  
  return { user, loading };
}

// utils/validation.ts - 검증 책임
export const isValidEmail = (email: string) => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// components/UserProfile.tsx - 렌더링 책임
function UserProfile() {
  const { user, loading } = useUser();
  
  if (loading) return <LoadingSpinner />;
  
  return <UserInfo user={user} />;
}
```

---

## O - Open/Closed Principle (개방-폐쇄 원칙)

### 원칙
> 확장에는 열려있고, 수정에는 닫혀있어야 합니다.

### React 컴포넌트에 적용

**❌ 나쁜 예시:**
```typescript
// 새로운 버튼 타입을 추가할 때마다 컴포넌트를 수정해야 함
function Button({ type, children }) {
  if (type === 'primary') {
    return <button className="bg-blue-500">{children}</button>;
  } else if (type === 'secondary') {
    return <button className="bg-gray-500">{children}</button>;
  } else if (type === 'danger') {
    return <button className="bg-red-500">{children}</button>;
  }
}
```

**✅ 좋은 예시:**
```typescript
// 새로운 스타일을 추가해도 컴포넌트는 수정하지 않음
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-500 text-white',
  danger: 'bg-red-500 text-white',
};

function Button({ variant = 'primary', className = '', children }: ButtonProps) {
  return (
    <button className={`${variantStyles[variant]} ${className}`}>
      {children}
    </button>
  );
}
```

---

## L - Liskov Substitution Principle (리스코프 치환 원칙)

### 원칙
> 자식 클래스는 부모 클래스를 대체할 수 있어야 합니다.

### React 컴포넌트에 적용

**✅ 좋은 예시:**
```typescript
// 기본 Input 인터페이스
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TextInput({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

// TextInput을 확장하지만 동일한 인터페이스를 유지
function EmailInput({ value, onChange, placeholder }: InputProps) {
  const handleChange = (newValue: string) => {
    // 추가 검증 로직
    if (isValidEmail(newValue) || newValue === '') {
      onChange(newValue);
    }
  };
  
  return (
    <input
      type="email"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

// 두 컴포넌트 모두 동일하게 사용 가능
function Form() {
  return (
    <>
      <TextInput value={name} onChange={setName} />
      <EmailInput value={email} onChange={setEmail} />
    </>
  );
}
```

---

## I - Interface Segregation Principle (인터페이스 분리 원칙)

### 원칙
> 클라이언트는 사용하지 않는 인터페이스에 의존하면 안 됩니다.

### React 컴포넌트에 적용

**❌ 나쁜 예시:**
```typescript
// 너무 많은 props를 가진 거대한 인터페이스
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  // 항상 필요하지 않은 props들
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  size?: 'sm' | 'md' | 'lg';
  // ... 더 많은 optional props
}
```

**✅ 좋은 예시:**
```typescript
// 기본 Modal 인터페이스
interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// 특정 기능에 필요한 인터페이스만 추가
interface ConfirmModalProps extends BaseModalProps {
  title: string;
  confirmText: string;
  onConfirm: () => void;
}

// 작고 명확한 인터페이스를 가진 컴포넌트
function Modal({ isOpen, onClose, children }: BaseModalProps) {
  if (!isOpen) return null;
  return <div className="modal">{children}</div>;
}

function ConfirmModal({ isOpen, onClose, title, confirmText, onConfirm }: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>{title}</h2>
      <button onClick={onConfirm}>{confirmText}</button>
    </Modal>
  );
}
```

---

## D - Dependency Inversion Principle (의존성 역전 원칙)

### 원칙
> 고수준 모듈은 저수준 모듈에 의존하면 안 되며, 둘 다 추상화에 의존해야 합니다.

### React 컴포넌트에 적용

**❌ 나쁜 예시:**
```typescript
// 컴포넌트가 구체적인 구현에 직접 의존
function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // 직접 fetch API 사용 (구체적인 구현)
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);
  
  return <ul>{users.map(user => <li>{user.name}</li>)}</ul>;
}
```

**✅ 좋은 예시:**
```typescript
// 추상화된 인터페이스
interface UserService {
  getUsers(): Promise<User[]>;
}

// 구체적인 구현
class ApiUserService implements UserService {
  async getUsers(): Promise<User[]> {
    const response = await fetch('/api/users');
    return response.json();
  }
}

// 의존성 주입을 통해 추상화에 의존
interface UserListProps {
  userService: UserService;
}

function UserList({ userService }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    userService.getUsers().then(setUsers);
  }, [userService]);
  
  return <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}

// 사용
function App() {
  const userService = new ApiUserService();
  return <UserList userService={userService} />;
}
```

**Custom Hook으로 구현:**
```typescript
// 추상화된 Hook
function useUsers(userService: UserService) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    userService.getUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, [userService]);
  
  return { users, loading };
}

// 컴포넌트는 추상화된 Hook만 사용
function UserList() {
  const userService = useUserService(); // DI Container에서 가져옴
  const { users, loading } = useUsers(userService);
  
  if (loading) return <LoadingSpinner />;
  return <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
```

---

## 프로젝트 적용 체크리스트

### ✅ 컴포넌트 작성 시
- [ ] 컴포넌트가 하나의 명확한 책임만 가지는가?
- [ ] 새로운 기능 추가 시 기존 코드를 수정하지 않고 확장 가능한가?
- [ ] Props 인터페이스가 필요한 것만 포함하는가?
- [ ] 외부 의존성을 직접 참조하지 않고 주입받는가?

### ✅ Hook 작성 시
- [ ] Hook이 하나의 기능만 담당하는가?
- [ ] 재사용 가능하고 테스트 가능한가?
- [ ] 구체적인 구현이 아닌 추상화된 인터페이스를 반환하는가?

### ✅ 유틸리티 함수 작성 시
- [ ] 순수 함수로 작성되었는가?
- [ ] 단일 책임을 가지는가?
- [ ] 확장 가능한 구조인가?

---

## 참고 자료
- [SOLID Principles in React](https://blog.openreplay.com/applying-solid-principles-in-react/)
- [Clean Code in React](https://dev.to/thawkin3/solid-principles-applied-to-react-components-3g3h)
