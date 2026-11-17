# 재고조회 (설치형 웹앱)

제품·부자재·원자재 창고 재고를 휴대폰에서 조회하는 앱.
품번 또는 TM-NO(규격) 일부를 입력하면 재고와 업데이트 시각을 보여준다.

- 화면: 이 저장소 (GitHub Pages)
- 데이터: 구글 시트 Apps Script 웹앱(`config.js`의 `STOCK_API_URL`)이 팀 PIN 확인 후 JSON으로 제공
- 이 저장소에는 재고 데이터와 PIN이 들어 있지 않다

## 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 앱 화면 |
| `config.js` | 데이터 주소 (Apps Script 웹앱 `/exec` 주소) |
| `manifest.webmanifest` | 앱 이름·아이콘 (설치용) |
| `sw.js` | 서비스 워커 (설치 기능, 화면 파일 저장) |
| `icons/` | 앱 아이콘 |

## 화면을 고친 뒤

`sw.js`의 `CACHE = "stock-app-v1"` 숫자를 올려야 팀원 앱이 새 화면으로 바뀐다.
