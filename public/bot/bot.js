

status.addListener("init", function () {
  return {"text-message": "Welcome to Genesis Token Tracker. ʕ•͡ᴥ•ʔ"};
});

var usersIndex = 0

function browse(screenNum, params){
  var host = 'http://localhost:3000/'
  var url = host + '#junk&' + usersIndex + '&' + screenNum
  console.log('this is the brows log...')
  return {
          title: "Browser",
          dynamicTitle: true,
          singleLineInput: true,
          actions: [ { type: status.actions.FULLSCREEN } ],
          markup: status.components.bridgedWebView(url)
  };
}
status.command({
    name: "help",
    title: 'the page where it tells you what this is about',
    description: 'the page',
    fullscreen: true,
    onSend: function(params){
      return browse(1, params)
    }
});

//TODO return to the chat bot. STRETCH
status.command({
      name: "myGroups",
      title: 'list all groups that you are part of',
      description: 'List all groups that you are part of',
      fullscreen: true,
      onSend: function(params){
        return browse(2, params)
      }
});

status.command({
    name: "myBets",
    title: 'list all your bets',
    description: 'list of all bets',
    fullscreen: true,
    onSend: function(params){
      return browse(3, params)
    }
});

//TODO: create group through chat bot using sequential parameters
status.command({
    name: "createGroup",
    title: 'create a betting group',
    description: 'create new group',
    fullscreen: true,
    onSend: function(params){
      return browse(4, params)
    }
});

status.command({
    name: "tokenInfo",
    title: 'List the tokens',
    description: 'List the tokens',
    fullscreen: true,
    onSend: function(params){
      return browse(5, params)
    }
});

status.command({
    name: "botInstructions",
    title: 'IDK man',
    description: 'IDK man',
    fullscreen: true,
    onSend: function(params){
      return browse(6, params)
    }
});

status.command({
    name: "inviteFriends",
    title: 'Invite friends to your group!',
    description: '"friends"',
    fullscreen: true,
    onSend: function(params){
      return browse(7, params)
    },
    preview: function (params) {
        var text = status.components.text(
            {
                style: {
                    marginTop: -10,
                    fontSize: 15,
                    fontFamily: "font",
                    color: "black"
                }
            }, "Not that you have any friends");
        return {markup: status.components.view({}, [text])};
    }
});

status.command({
    name: "PlaceBet",
    title: 'betting page',
    description: 'the reason you are here!',
    fullscreen: true,
    onSend: function(params){
      return browse(8, params)
    },
    preview: function (params) {
        var text = status.components.text(
            {
                style: {
                    marginTop: -10,
                    fontSize: 15,
                    fontFamily: "font",
                    color: "black"
                }
            }, "The real reason you are here. lets be honest");
        return {markup: status.components.view({}, [text])};
    }
});

status.command({
    name: "ViewGroup",
    title: 'view the groups you are part of',
    description: 'this is true  ',
    fullscreen: true,
    onSend: function(params){
      return browse(9, params)
    }
});

status.command({
    name: "your_eth",
    title: 'Your Ether',
    description: 'Check how much you spent/earnt ether',
    fullscreen: true,
    params: [
      {
          name: "account",
          type: status.types.TEXT,
          placeholder: "SGT holding account address"
      }
    ],
    onSend: function(params){
      return browse('eth_line', params)
    }
});

status.command({
    name: "setUser",
    title: 'Set User',
    description: 'Change the user that is acting on the dapp.',
    params: [
      {
        // TODO: select user from a list here.
          name: "account",
          type: status.types.NUMBER,
          placeholder: "account address",
      }
    ],
    preview: function (params) {
        var text = status.components.text(
            {
                style: {
                    marginTop: -10,
                    fontSize: 15,
                    fontFamily: "font",
                    color: "black"
                }
            }, "You have successfully selected user " + usersIndex);
        return {markup: status.components.view({}, [text])};
    }
    onSend: function(params){
      usersIndex = params.account
    }
});
