# [B반-b2조]데이터 시각화 웹 페이지 만들기
0. 프로젝트 소개
  - FastAPI 기반 EDA 시각화 서버
  - 구동 방법
  ```bash
  uvicorn app:app --reload --port 8000
  ```
1. 데이터 소개
  - 출처: https://www.kaggle.com/datasets/lorentzyeung/top-20-most-searched-queries-in-google-search
  - 연/월별로 US, UK, Germany, France, Netherlands, Italy, Australia에서 가장 많이 검색된 Top 20 쿼리 데이터셋
  - 팀 내부적으로 22년 8월부터 23년 8월까지 총 1년간의 데이터를 사용하기로 결정
2. 데이터 취합
  - 각 .csv 파일을 순회하며 단일 DataFrame으로 취합
  ```python
    # Specify the directory containing CSV files
    directory_path = Path('data')

    # Initialize an empty list to store DataFrames
    dfs = []

    # Loop through CSV files in the directory
    for csv_file in directory_path.glob('*.csv'):
        df = pd.read_csv(csv_file, encoding='latin1')
        dfs.append(df)

    # Concatenate all DataFrames into one
    df = pd.concat(dfs, ignore_index=True)

    # take out first two meaningless columns
    df = df.iloc[:, 2:]
  ```
3. EDA
  - df.head()
  ```python
    @app.get("/head/", response_class=HTMLResponse)
    async def get_head(n_rows: int=None):
        if n_rows is None:
            n_rows = 5
        df_head = df.head(n_rows)

        # Convert the DataFrame to HTML
        df_html = df_head.to_html(classes='table table-striped table-hover')

        # Create an HTML template with the DataFrame embedded
        html_content = f"""
        <html>
        <head>
            <title>DataFrame Display</title>
        </head>
        <body>
            <h1>DataFrame Display</h1>
            {df_html}
        </body>
        </html>
        """

        return HTMLResponse(content=html_content)
  ```
  - query parameter로 head() 메소드가 보여줄 행의 수를 요청할 수 있음
  - localhost:8000/head?n_rows=7
  ![Image Alt Text](images/head.png)