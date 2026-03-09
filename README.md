# 향기나는 꽃집 랜딩페이지

정적 HTML/CSS/JS 기반의 **향기나는 꽃집 주문/상담 랜딩페이지**입니다.  
웹 주문폼(Google Form)과 카카오톡 상담 버튼을 통해 예약 주문을 받는 구조입니다.

## 구조

- `index.html` — 랜딩 메인 페이지
  - Hero, 꽃이 필요한 순간, 추천 꽃 상품, 특별함, 배송 안내, 고객 후기, 주문 방법, CTA 섹션
  - Google Form, 카카오톡, 인스타그램 링크 버튼 포함
- `styles.css` — 감성 카페 스타일 UI (PRD 색상/타이포 적용)
- `script.js` — 모바일 네비게이션 토글, 부드러운 스크롤

## 링크 설정

아래 세 곳의 URL을 실제 운영 URL로 교체해서 사용하세요.

- Google Form 주문폼  
  - `index.html` 에서 `https://forms.gle/xxxxx` 검색 후 실제 폼 URL로 변경
- 카카오톡 상담  
  - `index.html` 에서 `https://pf.kakao.com/your-channel` 를 실제 채널/1:1 채팅 링크로 변경
- 인스타그램 계정  
  - `index.html` 에서 `https://instagram.com/your-flower-shop` 를 실제 계정 링크로 변경

## 로컬에서 열기

1. 이 폴더를 VS Code / Cursor 등 에디터로 엽니다.
2. `index.html` 파일을 브라우저(Chrome 등)에서 열면 바로 랜딩페이지를 확인할 수 있습니다.

## Vercel 배포 가이드 (TRD 기준)

1. Git 초기화 및 커밋
   ```bash
   git init
   git add .
   git commit -m "향기나는 꽃집 랜딩페이지 초기 버전"
   ```
2. GitHub 새 저장소에 푸시
3. [Vercel](https://vercel.com) 에서 New Project → 해당 GitHub 저장소 선택
4. Framework: `Other` (또는 Static) / Build 설정은 기본값 유지
5. 배포 후 Vercel 기본 도메인 (예: `hyanggi-flower.vercel.app`) 으로 접속

