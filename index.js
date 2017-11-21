'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "arn:aws:lambda:us-east-1:645239734771:function:myScientificPlantIdentification"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Scientific Plant Identification';

/**
 * Array containing scientific plant names with their common names.
 */
var SPI = [
    "The Black Alder is the common name for the Alnus glutinosa.",
    "The Gray Alder is the common name for the Alnus incana.",
    "The Almond is the common name for the Prunus amygdalus.",
    "The Amy Root is the common name for the Ambrosia trifida.",
    "The Apple is the common name for the Malus domestica.",
    "The Apricot is the common name for the Prunus armeniaca.",
    "The Arizona Sycamore is the common name for the Platanus wrighitii.",
    "The Arrowwood is the common name for the Cornus florida.",
    "The Black Ash is the common name for the Acer negundo or Fraxinus nigra.",
    "The Cane Ash is the common name for the Fraxinus americana.",
    "The Blue Ash is the common name for the Fraxinus pennsylvanica.",
    "The Bamboo is the common name for the Bambuseae.",
    "The Bearberry is the common name for the Ilex decidua.",
    "The Beech is the common name for the Fagus.",
    "The Birch is the common name for the Betula.",
    "The European weeping birch is the common name for the Betula pendula.",
    "The Paper Birch is the common name for the Betula papyrifera.",
    "The Bittercress is the common name for the Barbarea vulgaris.",
    "The Blackberry is the common name for the Rubus.",
    "The Black-eyed Susan is the common name for the Rudbeckia hirta or Rudbeckia fulgida.",
    "The Blackhaw is the common name for the Viburnum prunifolium.",
    "The Sand brier is the common name for the Solanum carolinense.",
    "The Brittlebush is the common name for the Encelia farinosa.",
    "The Broadleaf is the common name for the Plantago major.",
    "The Cabbage is the common name for the Brassica oleracea.",
    "The California bay is the common name for the Umbellularia californica.",
    "The California buckeye is the common name for the Aesculus californica.",
    "The California sycamore is the common name for the Platanus racemosa.",
    "The California walnut is the common name for the Juglans californica.",
    "The Canada root is the common name for the Asclepias tuberosa.",
    "The Carrot is the common name for the Daucus carota.",
    "The Cherry is the common name for the Prunus.",
    "The Chestnut is the common name for the Castanea.",
    "The Chigger Flower is the common name for the Asclepias tuberosa.",
    "The Chrysanthemum is the common name for the Dendranthema grandiflora or Chrysanthemum morifolium.",
    "The Cinnamon is the common name for the Cinnamomum.",
    "The Clove is the common name for the Syzygium aromaticum.",
    "The Clover is the common name for the Trifolium.",
    "The Coconut is the common name for the Cocos nucifera.",
    "The Coffee plant is the common name for the Coffea.",
    "The Cornelian Tree is the common name for the Cornus florida.",
    "The Cotton Plant is the common name for the Gossypium.",
    "The Creeping Yellowcress is the common name for the Rorippa sylvestris.",
    "The Crowfoot is the common name for the Cardamine concatenata.",
    "The Crow's nest is the common name for the Daucus carota.",
    "The Cucumber is the common name for the Cucumis sativus.",
    "The Daisy is the common name for the Bellis perennis.",
    "The Devil's Bite is the common name for the Veratrum viride.",
    "The Devil's Plague is the common name for the Daucus carota.",
    "The Dewberry is the common name for the Rubus hispidus.",
    "The Dindle is the common name for the Sonchus arvensis.",
    "The Dogwood is the common name for the Cornus.",
    "The Fig is the common name for the Ficus.",
    "The Fluxroot is the common name for the Asclepias tuberosa.",
    "The Grapevine is the common name for the Vitis.",
    "The Holly is the common name for the Ilex.",
    "The Huckleberry is the common name for the Vaccinium.",
    "The Juneberry is the common name for the Amelanchier canadensis.",
    "The Lavender is the common name for the Lavandula.",
    "The Leek is the common name for the Allium.",
    "The Lettuce is the common name for the Lactuca sativa.",
    "The Summer Lilac is the common name for the Hesperis matronalis.",
    "The Love vine is the common name for the Clematis virginiana.",
    "The Maize is the common name for the Zea mays.",
    "The Mango is the common name for the Mangifera indica.",
    "The Maple is the common name for the Acer.",
    "The Mesquite is the common name for the Prosopis.",
    "The Milfoil is the common name for the Achillea millefolium.",
    "The Milkweed is the common name for the Asclepias or the Sonchus oleraceus.",
    "The Deadly Nightshade, Garden nightshade and Black nightshade is the common name for the Solanum nigrum.",
    "The English Oak is the common name for the Quercus robur.",
    "The Red Oak is the common name for the Quercus robur or Quercus coccinea.",
    "The White Oak is the common name for the Quercus velutina.",
    "The Olive is the common name for the Olea europaea.",
    "The Onion is the common name for the Allium.",
    "The Parsley is the common name for the Petroselinum crispum.",
    "The Pea is the common name for the Pisum sativum.",
    "The Peach is the common name for the Prunus persica.",
    "The Peanut is the common name for the Arachis hypogaea.",
    "The Pear is the common name for the Pyrus.",
    "The Pine is the common name for the Pinus.",
    "The Pineapple is the common name for the Ananas comosus.",
    "The Pistachio is the common name for the Pistacia vera.",
    "The Plantain is the common name for the Plantago major.",
    "The Poison Ivy is the common name for the Toxicodendron radicans.",
    "The Poisonberry is the common name for the Solanum dulcamara.",
    "The Poppy is the common name for the Papaveraceae.",
    "The Potato is the common name for the Solanum tuberosum.",
    "The Black Raspberry and the Purple Raspberry are the common names for the Rubus occidentalis",
    "The Redweed is the common name for the Phytolacca americana.",
    "The Rose is the common name for Rosa.",
    "The Prairie Rose is the common name for the Rosa virginiana.",
    "The Strawberry is the common name for Fragaria or ananassa.",
    "The Sugarcane is the common name for Saccharum.",
    "The Sunflower is the common name for the Helianthus annuus.",
    "The Sugarplum is the common name for the Amelanchier canadensis.",
    "The Sweet Potato is the common name for the Ipomoea batatas.",
    "The Sycamore is the common name for the Platanus.",
    "The Thyme is the common name for the Platanus.",
    "The Tobacco Plant is the common name for the Nicotiana.",
    "The Tomato is the common name for the Solanum Iycopersicum.",
    "The Toothwort is the common name for the Cardamine Concatenata.",
    "The Tree Tobacco is the common name for the Nicotiana glauca.",
    "The Tulip is the common name for the Tulipa.",
    "The Violet is the common name for the Viola.",
    "The Walnut is the common name for the Juglans.",
    "The Wheat is the common name for the Triticum.",
    "The Willow is the common name for the Salix."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random plant Identification fact from the SPI facts list
        var factIndex = Math.floor(Math.random() * SPI.length);
        var randomFact = SPI[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a twin peaks fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
