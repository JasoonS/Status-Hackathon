// var Wikipedia = require('./wikipidia');

status.command({
     name: "greet",
     title: "Greeter",
     description: "Helps you choose greetings",
     color: "#0000ff",
     params: [{
              name: "greet",
              type: status.types.TEXT,
              suggestions: helloSuggestions
             }]
 })

function suggestionsContainerStyle(suggestionsCount) {
    return {
        marginVertical: 1,
        marginHorizontal: 0,
        keyboardShouldPersistTaps: "always",
        height: Math.min(150, (56 * suggestionsCount)),
        backgroundColor: "yellow",
        borderRadius: 5,
        flexGrow: 1
    };
}
var suggestionSubContainerStyle = {
    height: 56,
    backgroundColor: "red",
    borderBottomWidth: 1,
    borderBottomColor: "#0000001f"
};

var valueStyle = {
    marginTop: 9,
    fontSize: 14,
    fontFamily: "font",
    color: "#000000de"
};

function helloSuggestions() {
    // var returnedCont getContent('australia')
    // var returnedCont = {
    //   links: ['hey', 'ho', 'hideihoe']
    // }
    // var suggestions = getContent('australia').then(function(returnedCont) {
      var links= ['hey', 'ho', 'hideihoe', 'ppp-shit']
      links.map(function(entry) {
      // returnedCont.links.map(function(entry) {
        return status.components.touchable(
            {onPress: status.components.dispatch([status.events.SET_VALUE, entry])},
            status.components.view(
                suggestionsContainerStyle,
                [status.components.view(
                    suggestionSubContainerStyle,
                    [
                        status.components.text(
                            {style: valueStyle},
                            entry
                        )
                    ]
                )]
            )
        );
    // });
  })
  // .catch((err) => console.log("Error fetching data!" + err));

    // Let's wrap those two touchable buttons in a scrollView
    var view = status.components.scrollView(
        suggestionsContainerStyle(2),
        suggestions
    );

    // Give back the whole thing inside an object.
    return {markup: view};
}


// var rp = require('request-promise-native');
var endpoint = 'https://en.wikipedia.org/w/api.php?format=json&action=query&exintro=&prop=extracts|links&pllimit=max&titles=';

function getContent(topic){
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('yay')
            //Timeout om een request te simuleren.
            resolve({
              links: ['hey', 'ho', 'hideihoe', 'ppp-shit']
            });
        }, 250);
    // var currentPage = {};
    // currentPage.topic = topic;
    // currentPage.links = new Set();
    //
    // var content = rp(endpoint+topic)
    //   .then(function(body) {
    //     console.log("Received body from: " + endpoint + topic);
    //
    //     let freshRates = JSON.parse(body);
    //     Object.values(freshRates.query.pages).map( function (page) {
    //       // Scrape links from the page.
    //       page.links.map(function(link) {
    //         currentPage.links.add(link.title);
    //       });
    //       // Parse out html from the extract.
    //       // Should only be one page.
    //       currentPage.extract = page.extract.replace(/<[^<>]*?>/g, '')
    //     });
    //
    //     console.log("Converting the links to an array.");
    //     // Convert Set() back to array.
    //     var linksList = [];
    //     currentPage.links
    //       .forEach(function(link) {linksList.push(link)});
    //     currentPage.links = linksList;
    //
    //     console.log("Resolving.");
    //     return resolve(currentPage);
    //   })
    //   .catch(function(error) {
    //     console.log("Problem here.");
    //     return reject(error);
    //   })
  });
}
