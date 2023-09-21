from pathlib import Path
from wordcloud import WordCloud
from fastapi import Body, FastAPI, Query, HTTPException
from fastapi.responses import HTMLResponse, FileResponse
from io import BytesIO

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.graph_objects as go
import base64


app = FastAPI()


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


@app.get("/describe")
async def get_describe():
    df_desc = df.describe(include='object')

    # Convert the DataFrame to HTML
    df_html = df_desc.to_html(classes='table table-striped table-hover')

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


@app.get("/mode/")
async def get_mode():
    # most frequent query by year and month
    most_frequent = df.groupby(['year', 'month'])['1'].apply(lambda x: x.mode())

    # Create a new DataFrame to present the results
    result_df = most_frequent.reset_index()

    countries_share = []
    for i in range(len(result_df)):
        year = result_df.loc[i, 'year']
        month = result_df.loc[i,'month']
        top_query = result_df.loc[i, '1']
        countries_share.append(','.join(df[(df['year']==year) & (df['month']==month) & (df['1']==top_query)].kw_location.unique()))
    result_df.loc[:, 'countries_share'] = countries_share

    # Convert the DataFrame to HTML
    df_html = result_df.iloc[:, [0, 1, 3, 4]].to_html(classes='table table-striped table-hover')

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
    

@app.get("/word-cloud/", response_class=HTMLResponse)
async def plot_wc(country: str=None, n_ranks: int=None):
    
    # word cloud
    if country is None:
        df_country = df.copy()
    else:
        df_country = df[df['kw_location'] == country]
    columns = df_country['1']
    for i in range(n_ranks):
        df_country.iloc[:, 6+i] = df_country.iloc[:, 6+i].apply(lambda x: x.replace(' ', ''))
        if i != 0:
            columns += ' ' + df_country.iloc[:, 6+i]
        
    # Concatenate text from multiple columns into a single string
    combined_text = ' '.join(columns)

    # Create a WordCloud object
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(combined_text)

    # Display the word cloud plot
    plt.figure(figsize=(10, 5))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.title('Word Cloud from Multiple Columns')
    # plt.show()

    # Save the plot as an image in memory
    buffer = BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    
    # Encode the image data as base64
    image_base64 = base64.b64encode(buffer.read()).decode("utf-8")

    # Return an HTML page with the image
    html_content = f"""
    <html>
    <head>
        <title>Matplotlib Plot on Web Page</title>
    </head>
    <body>
        <h1>Matplotlib Plot</h1>
        <img src="data:image/png;base64,{image_base64}" alt="Sample Plot">
    </body>
    </html>
    """

    return HTMLResponse(content=html_content)
    