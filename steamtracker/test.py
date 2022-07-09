import schedule 
import time 
import requests

#how much time a user has spent on steam last two weeks

# steam http request variables
#https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=24A33E86A104CEA32537C3D750F91E49&vanityurl=charleslele2002
api_url = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/"
parameter = "?key=24A33E86A104CEA32537C3D750F91E49&steamids=76561198327972988"
req = requests.get(url = api_url, params = parameter)

def main():
    data = req.json()
    print(data)

main()






"""
#runs every minute
schedule.every(1).minutes.do(main)

while True:
    schedule.run_pending()
    time.sleep(1)
"""
