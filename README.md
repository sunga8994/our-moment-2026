# 우리의 순간, 대한민국

2026 아이치·나고야 아시안게임 축구 입문 캠페인. HTML/CSS/JavaScript로 제작했습니다.

## GitHub Pages 배포

공개 주소(배포 성공 후 사용): https://sunga8994.github.io/our-moment-2026/
GitHub Settings → Pages → Source를 GitHub Actions로 선택합니다. main 변경 시 .github/workflows/pages.yml이 deploy-static.mjs로 필요한 파일만 dist에 모아 배포합니다. 링크는 하위 경로에서도 동작하도록 상대 경로를 사용합니다.

## 실행
Node.js가 있는 환경에서 이 폴더를 열고 `node server.mjs` 실행 후 http://127.0.0.1:4173/ 접속.
첫 방문 오프닝 반복 확인: http://127.0.0.1:4173/?preview=intro
정적 호스팅에는 server.mjs/package.json을 제외한 HTML, CSS, JS, assets, blog 폴더 전체를 함께 업로드하세요. 도메인의 루트 경로 배포 기준입니다.

## 구현 내용
- 첫 방문 자동 무음 킥 영상 → 공 확대 전환 → 메인. 건너뛰기/Escape/소리 토글/재방문 생략.
- 사용자가 제공한 실제 팀 기념 포스터를 배경에 통합한 히어로. 모바일 크롭과 그라데이션 적용.
- 관전 포인트, 선수 소개, 하이라이트 안내, 응원 노트 카드 세 개, FAQ, 최종 CTA, 출처.
- 응원 노트 목록 /blog/ 와 세 편의 독립 글 상세.
- 메인 CTA → 관전 입문 글 → 선수 글 → 경기 글 → 중계사 대회 특집.
- 글별 제목·설명 메타데이터, 목차, 읽기 순서, 관련 글, 출처, 모바일 레이아웃.
- 야랑이 응원 일러스트 세 가지. PNG 원본 보관, 웹에서는 WebP 사용.
- CTA 클릭 시 landing:cta 이벤트만 발생. 실제 GA4/GTM 연결은 별도 작업.

## 응원 노트 세 편
1. /blog/football-guide/ — 아시안게임 축구 하이라이트, 골만 보면 놓치는 3가지
2. /blog/meet-the-team/ — 이름을 알고 보면 달라진다: 아시안게임 축구대표팀 입문 가이드
3. /blog/matches-to-replay/ — 아시안게임 축구를 놓쳤다면? 지금 다시 볼 경기와 장면들
초안 원고는 각 index.html의 note-body 영역에서 수정할 수 있습니다.

## 사실 확인 및 출처 (2026.10.22)
- 개최 정보: https://www.aichi-nagoya2026.org/
- 대표팀 최종 명단: https://media.kfa.or.kr/bbs/bbs.php?act=bbs_view&con=2444718faafdd61acb0a15d5e12bc6e3&idx=5103
- 경기 결과: https://kfa.or.kr/national/?act=mu_23
- 사우디전 기사: https://www.kfa.or.kr/layer_popup/popup_live.php?act=news_tv_detail&check_url=bGF5ZXI%3D&div_code=news&idx=28316&lang=KOR
- 영상 탐색: https://www.spotvnow.co.kr/2026ag/
기사의 경기 시간은 영상 재생 타임스탬프가 아닙니다. 일반 관전 질문은 편집 제안으로, 특정 선수의 능력이나 실제 영상 분석 결과를 뜻하지 않습니다. 중계사 버튼은 대회 특집으로 이동하며 개별 영상 재생·모든 경기의 현재 제공 여부는 확인하지 않았습니다.

## 이미지와 영상
- 팀 기념 포스터: 사용자 제공. 사용자가 이미지를 가져온 문서: https://namu.wiki/w/2026%20%EC%95%84%EC%9D%B4%EC%B9%98%C2%B7%EB%82%98%EA%B3%A0%EC%95%BC%20%EC%95%84%EC%8B%9C%EC%95%88%20%EA%B2%8C%EC%9E%84/%EC%B6%95%EA%B5%AC%28%EB%82%A8%EC%9E%90%29/%EA%B2%B0%EC%8A%B9%EC%A0%84
  2026.10.22 사용자가 제공한 경로를 기록했습니다. 문서 접근 실패로 이미지 일치·원게시자·사용 조건은 독립 확인하지 못했습니다. 나무위키 문서 링크가 원저작자의 사용 허락을 뜻하지는 않습니다.
- 킥 영상: 사용자 제공 Higgsfield AI 영상. 실제 경기·공식 유니폼 자료가 아닙니다. 원본 동일 구간 오디오를 연결하고 마지막 0.25초 페이드 적용. 소리는 사용자 클릭으로만 활성화됩니다.
- 야랑이: 사용자 창작 캐릭터의 기존 참고 이미지를 바탕으로 내장 imagegen 도구로 응원복 변형을 생성했습니다. 이 사이트 안내 캐릭터이며 공식 마스코트가 아닙니다.
- 생성 방향: 기존 연노랑 아기 호랑이의 두 갈래 머리털·갈색 줄무늬·큰 갈색 눈·분홍 볼·작은 이빨·색연필 질감을 유지. 소방 장비를 없애고 빨간 무지 티셔츠, 네이비 반바지, 빨강/흰색 응원 목도리. 투명 배경, 로고/텍스트 없음. 세 포즈는 공을 들고 궁금한 표정 / 빈 선수 카드를 들고 소개 / 두 앞발을 들고 응원.

## 검증과 남은 작업
5개 HTML 페이지의 로컬 링크·자산 누락 및 응답 정상 여부 확인. PC/모바일 미리보기, 글 1→2→3 CTA와 중계사 링크 확인. GitHub 저장소와 배포 워크플로를 준비했습니다. canonical·사이트맵·robots는 GitHub Pages 주소 기준입니다. 실제 공개 접속 검증 결과는 별도 배포 기록에 남깁니다. 분석 도구 설정은 아직 진행하지 않았습니다.

## 과제 보완 준비 (2026.10.23)
독립 /about/, 명시적 블로그 메뉴, 카드 발행일, 이미지 캡션, 도입 핵심 답·요약, JSON-LD와 인증 태그 삽입 위치를 추가했습니다. GTM 컨테이너: GTM-MJK9NH8T. GA4: G-LJJR5VMBNC. CTA 클릭은 our_moment_cta dataLayer 이벤트로 전달하며 event_name으로 5개 행동을 구분합니다. Google 기본 page_view와 합쳐 6개 이벤트를 설계했습니다. CTA JSON은 기존 컨테이너에 병합하는 미검증 초안이며 기존 기본 태그를 덮어쓰면 안 됩니다. 실제 수집 검증은 별도입니다. 메타 픽셀/검색 인증값은 미제공 상태입니다.
