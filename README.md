![Alt text](betbot.png?raw=true "Title")

# Status-Hackathon
## Betbot a bot for betting beer (and such) with friends!

Repo for the status hackathon

### Why we made this app

It also started with the original idea BeerBot, in which people in a friend group could track how many beers they owed each other. we realised that this idea could be extended to use any token that the group could want as well as add functionality as people could bet on things. Friendly things. this app is intended to be used by families or close friends in order to keep track of minor debts that could otherwise hinder the growth of the friend group.

Each group has its own zero sum token (some people have negative tokens and sum have positive; all summing up to 0). This functionality is pretty cool has coins will never need to minted or burnt in the traditional way but would rather be sent to the person that wins the bet when the betting period has expired.

**Use case one**

(set later)

**Use Case two**

(set later)

### Who are we?

**Jason**
Honours student at UCT. pretty darn cool. (@JasoonS)

**Cary**
3rd year student at UCT. bad at coding (@yepster1)

**Brendan**
awesome venture capitalist guy who helped with design, and pushed the ideas forward.(@chateaux)

others: Victor, Jon Jon and Roy
### Instruction for use

#### notes for building yourself

1. navigate to the correct directory and clone the repo.
```javascript
   git clone https://github.com/JasoonS/Status-Hackathon.git
   cd Status-Hackathon```
2. run npm-install to install dependencies
```javascript
npm install```
3. run testrpc in a seperate tab
```javascript
testrpc --port 6546```
4. This assumes that you have a device that you know the IP of as well as you have adb installed
```javascript
adb reverse tcp:8546 tcp:8546
   adb reverse tcp:3000 tcp:3000```
5. switch node
```javascript
status-dev-cli switch-node http://localhost:8546 --ip <DEVICE IP```  
6. run the commands to build to the device
```javascript
status-dev-cli add --ip <DEVICE IP```
7. run npm
```javascript
npm run start```

#### troubleshooting

1. we noticed that you occasinally need to restart debug mode as well as restart the app.
2. you might need to watch the directory
'''status-dev-cli watch --ip <DEVICE IP>

### Our challenges
- We originally had a lot of trouble with getting status to update after making a change to the code.
  - a fix for our problem would have probably been more together troubleshooting docs (even though people like cryptowanderer did help a lot!)
- Once we got started using the API properly the development was not particularly bad considering it is still in its early stages.
- Solidity was an issue and getting it implemented inside of status. this was fixed after we were told of cool tools such as (browser tool)
- We had never done any large scale projects in ethereum or made an actual dapp more than just a simple token creator so learning all that was also a huge challenge!
