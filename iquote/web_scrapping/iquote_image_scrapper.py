from cgitb import html
from bs4 import BeautifulSoup
import urllib.request
import requests, time
import urllib.request

#https://www.photock.jp/

numberOfPage = 10
numberOfImage1 = 1
sourceURL = 'https://www.photock.org/list/r/scene/'

def find_jobs(sourceURL, numberOfImage):
    html_text = requests.get(sourceURL).text
    soup = BeautifulSoup(html_text, 'lxml')
    jobs = soup.find('div', {"id" : 'left'}).find('ul', {"id" : 'list'}).find_all('li')

    for job in jobs:
        if job.find('a') is not None:
            imagePath = job.find('a').get('href')
            #print(imagePath)
            find_jobs2(imagePath, numberOfImage)
            numberOfImage += 1
    
    return numberOfImage

def find_jobs2(path, index):
    url = 'https://www.photock.org' + path
    #print(url)

    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')
    job = soup.find('div', {"id" : 'photo'}).find('a')
    link = job.get('href')

    urllib.request.urlretrieve(link ,"images/local_image" + str(index) + ".jpg")

"""
if numberOfPage == 1:
    find_jobs(sourceURL, numberOfImage1)
else:
    for i in range(1,numberOfPage + 1):
        if i == 1:
            numberOfImage1 = find_jobs(sourceURL, numberOfImage1)
        else:
            sourceURL = 'https://www.photock.org/list/r/scene/' + (str(i) + "/")
            print(sourceURL)
            numberOfImage1 = find_jobs(sourceURL, numberOfImage1)
"""
numberOfImage1 = find_jobs(sourceURL,1)

for i in range(2, 11):
    sourceURL = 'https://www.photock.org/list/r/scene/' + (str(i) + "/")
    print(sourceURL)
    numberOfImage1 = find_jobs(sourceURL, numberOfImage1)


