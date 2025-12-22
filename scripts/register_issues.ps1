$issues = @(
    @{
        Title = "[Setup] 프로젝트 초기 설정 및 환경 구성"
        Body = @"
**작업 배경 (Background):**
프로젝트의 기반을 다지는 단계입니다. React, TypeScript, Vite를 사용하여 신속한 개발 환경을 구축하고, 디자인 시스템 개발에 필요한 Storybook과 스타일링 엔진(Tailwind/Vanilla Extract)을 설정하여 일관된 개발 경험(DX)을 제공해야 합니다.

**작업 내용 (Content):**
- [ ] 프로젝트 초기화 (React, TypeScript, Vite)
- [ ] Storybook 설치 및 설정
- [ ] Tailwind CSS (또는 Vanilla Extract) 설치 및 설정
- [ ] 기본 디렉토리 구조 및 Alias 설정

**인수 조건 (Acceptance Criteria):**
- [ ] ``npm run dev`` 실행 시 에러 없이 개발 서버가 실행되어야 한다.
- [ ] ``npm run storybook`` 실행 시 Storybook 대시보드가 정상적으로 열려야 한다.
- [ ] 스타일링 엔진이 정상 작동하며, 기본 스타일이 적용되어야 한다.
- [ ] 정해진 디렉토리 구조(src/components, src/hooks 등)가 생성되어야 한다.
"@
    },
    @{
        Title = "[Feature] Headless Dropdown/Select 컴포넌트 구현"
        Body = @"
**작업 배경 (Background):**
사용자가 옵션을 선택할 수 있는 Dropdown 컴포넌트입니다. 복잡한 포커스 관리와 키보드 인터랙션이 요구되며, Headless 구조로 설계하여 스타일의 자유도를 보장해야 합니다.

**작업 내용 (Content):**
- [ ] [Dropdown] 기본 UI 구조 및 Trigger 구현
- [ ] [Dropdown] 메뉴 표시/숨김 로직 구현 (Open/Close State)
- [ ] [Dropdown] 키보드 접근성 구현 (Arrow Up/Down, Enter, Esc)
- [ ] [Dropdown] Storybook 문서화

**인수 조건 (Acceptance Criteria):**
- [ ] Trigger 클릭 시 메뉴가 토글(열림/닫힘)되어야 한다.
- [ ] 메뉴가 열린 상태에서 ``Arrow Up/Down`` 키로 옵션 탐색이 가능해야 한다.
- [ ] ``Enter`` 키로 옵션 선택, ``Esc`` 키로 메뉴 닫기가 가능해야 한다.
- [ ] 스크린 리더가 현재 선택된 옵션과 메뉴의 상태(열림/닫힘)를 정확히 읽어야 한다.
"@
    },
    @{
        Title = "[Feature] 접근성을 준수한 Modal/Dialog 컴포넌트 구현"
        Body = @"
**작업 배경 (Background):**
사용자의 주의를 집중시키거나 중요 정보를 전달하는 모달입니다. 포커스 트랩(Focus Trap)과 스크린 리더 접근성(ARIA) 준수가 필수적이며, 부드러운 진입/이탈 애니메이션을 지원해야 합니다.

**작업 내용 (Content):**
- [ ] [Modal] Portal 기반 Overlay 구현
- [ ] [Modal] Focus Trap (포커스 가두기) 구현
- [ ] [Modal] Esc 키 닫기 및 접근성 속성 적용
- [ ] [Modal] Framer Motion 진입/이탈 애니메이션 적용
- [ ] [Modal] Storybook 문서화

**인수 조건 (Acceptance Criteria):**
- [ ] 모달이 열릴 때 포커스가 모달 내부로 이동하고, 외부로 빠져나가지 않아야 한다(Focus Trap).
- [ ] ``Esc`` 키를 누르거나 Overlay를 클릭하면 모달이 닫혀야 한다.
- [ ] ``Portal``을 사용하여 DOM 계층 구조상 최상위에 렌더링되어야 한다.
- [ ] Framer Motion을 통한 진입/이탈 애니메이션이 자연스럽게 동작해야 한다.
"@
    },
    @{
        Title = "[Feature] Compound Pattern 기반 Tabs 컴포넌트 구현"
        Body = @"
**작업 배경 (Background):**
콘텐츠를 섹션별로 구분하여 보여주는 탭 컴포넌트입니다. Compound Component Pattern을 적용하여 ``Tabs.Root``, ``Tabs.List``, ``Tabs.Content`` 등으로 유연하게 구성할 수 있어야 합니다.

**작업 내용 (Content):**
- [ ] [Tabs] Compound Component 구조 설계 (Root, List, Trigger, Content)
- [ ] [Tabs] 활성 탭 상태 관리 로직
- [ ] [Tabs] 키보드 네비게이션 (Left/Right Arrow)
- [ ] [Tabs] Storybook 문서화

**인수 조건 (Acceptance Criteria):**
- [ ] 탭 클릭 시 연결된 콘텐츠 패널만 표시되어야 한다.
- [ ] 탭 리스트에서 ``Left/Right Arrow`` 키로 탭 간 이동이 가능해야 한다.
- [ ] 각 탭과 패널에 적절한 ``aria-selected``, ``aria-controls``, ``role=""tab""`` 속성이 적용되어야 한다.
"@
    },
    @{
        Title = "[Feature] Headless Accordion 컴포넌트 구현"
        Body = @"
**작업 배경 (Background):**
내용을 접고 펼칠 수 있는 아코디언 컴포넌트입니다. 다중 선택 옵션과 애니메이션을 지원하며, 접근성 속성을 꼼꼼히 챙겨야 합니다.

**작업 내용 (Content):**
- [ ] [Accordion] 항목 확장/축소 상태 관리
- [ ] [Accordion] 다중 선택/단일 선택 옵션 구현
- [ ] [Accordion] WAI-ARIA 속성 적용 (``aria-expanded``, ``aria-controls``)
- [ ] [Accordion] Framer Motion 높이 애니메이션 적용

**인수 조건 (Acceptance Criteria):**
- [ ] 헤더 클릭 시 패널이 부드럽게 펼쳐지거나 접혀야 한다.
- [ ] ``aria-expanded`` 속성이 현재 상태를 정확히 반영해야 한다.
- [ ] 다중 선택 모드와 단일 선택 모드(하나 열면 다른 것 닫힘)가 정상 동작해야 한다.
"@
    },
    @{
        Title = "[Feature] Toast 알림 시스템 구현"
        Body = @"
**작업 배경 (Background):**
사용자에게 피드백을 전달하는 토스트 메시지입니다. 자동 사라짐 기능과 스크린 리더가 즉시 인지할 수 있는 접근성 처리가 필요합니다.

**작업 내용 (Content):**
- [ ] [Toast] Toast Provider 및 Context 구현
- [ ] [Toast] 자동 사라짐 타이머 로직
- [ ] [Toast] 스크린 리더 알림 처리 (Assertive/Polite)
- [ ] [Toast] 애니메이션 및 위치 선정 로직

**인수 조건 (Acceptance Criteria):**
- [ ] 함수 호출 등 간편한 방식으로 토스트를 띄울 수 있어야 한다.
- [ ] 설정된 시간이 지나면 자동으로 사라져야 하며, 호버 시 타이머가 일시 정지되어야 한다.
- [ ] 스크린 리더가 토스트 메시지를 즉시 읽어줘야 한다 (``role=""alert""`` or ``aria-live``).
"@
    },
    @{
        Title = "[Feature] Switch 및 Tooltip 유틸리티 컴포넌트 구현"
        Body = @"
**작업 배경 (Background):**
자주 사용되는 소형 컴포넌트인 스위치와 툴팁입니다. 단순해 보이지만 상태 관리와 위치 계산 로직, 접근성 라벨링이 중요합니다.

**작업 내용 (Content):**
- [ ] [Switch] On/Off 상태 제어 로직
- [ ] [Switch] 키보드 조작 및 접근성 라벨링
- [ ] [Tooltip] Hover/Focus 이벤트 핸들링
- [ ] [Tooltip] 위치 계산 (Positioning) 로직
- [ ] [Tooltip] 접근성 (``aria-describedby``) 적용

**인수 조건 (Acceptance Criteria):**
- [ ] **Switch:** 클릭 및 스페이스바 입력으로 토글되어야 하며, ``aria-checked`` 상태가 올바르게 변경되어야 한다.
- [ ] **Tooltip:** 타겟 요소에 호버하거나 포커스할 때 툴팁이 나타나야 하며, 화면 밖으로 잘리지 않도록 위치가 자동 조정되어야 한다.
"@
    },
    @{
        Title = "[Docs] 문서화 및 배포 파이프라인 구축"
        Body = @"
**작업 배경 (Background):**
라이브러리의 사용성을 높이기 위한 문서화와 배포 단계입니다. 사용자가 쉽게 따라 할 수 있는 가이드와 데모를 제공해야 합니다.

**작업 내용 (Content):**
- [ ] README.md 작성 (설치 및 사용법)
- [ ] Storybook 배포 (Vercel/Netlify 등)
- [ ] 최종 접근성 점검 (Lighthouse, Screen Reader)

**인수 조건 (Acceptance Criteria):**
- [ ] ``README.md``에 설치 방법, 기본 사용법, 기여 가이드가 포함되어야 한다.
- [ ] 배포된 Storybook 링크 접속 시 모든 컴포넌트가 정상 동작해야 한다.
- [ ] 주요 컴포넌트가 Lighthouse 접근성 점수 100점을 달성해야 한다.
"@
    }
)

foreach ($issue in $issues) {
    Write-Host "Creating issue: $($issue.Title)"
    gh issue create --title $issue.Title --body $issue.Body
    Start-Sleep -Seconds 2
}
