 
# [B반-b2조] 데이터 시각화 웹 페이지 Frontend 

## 기술 스택
- Next.js
- tailwindcss
- shadcn-ui

## 세팅
```shell
git clone https://github.com/wschung1113/b2-webproject.git


# API 서버가 필요하므로 먼저 서버를 실행
# server 
cd b2-webproject
python -m venv .venv
pip install -r requirement.txt
uvicorn app:app --reload --port 8000


# frontend
cd b2-webproject
cd frontend
npm install
npm run dev
```