from asyncio import constants
from cgitb import html
from bs4 import BeautifulSoup
import requests, time

text_file = open("scrapped_quotes.txt", "w", encoding="utf-8")

GOODREAD_MAIN = "https://www.goodreads.com"
html_text = requests.get('https://www.goodreads.com/quotes/tag/inspirational').text

def find_quotes(html):
    
    soup = BeautifulSoup(html, 'lxml')
    quotes = soup.find_all('div', class_ = 'quoteText')

    for quote in quotes:
        quote_text = quote.text.replace('\n', '')
        #Filter out long quotes
        if len(quote_text) <= 300:
            #print(quote_text) 
            text_file.write(quote_text + "\n")

    next_page = soup.find('a', class_ = 'next_page')
    if next_page is None:
        print("The end")
        return
    else:
        next_link = next_page['href']
        html_text = requests.get(GOODREAD_MAIN + next_link).text
        print("Getting next page" + next_link)
        find_quotes(html_text)

find_quotes(html_text)
text_file.close()