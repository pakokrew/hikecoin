require('babel-polyfill');

const Coins = require('./models/Coins');
const Army = require('./lib/Army');
const API = require('./lib/Api');
const Hiker = require('./lib/Hiker');
const Elephant = require('./models/Elephant');

const refreshInterval = 30000;

async function coinRefresher() {
    await Coins.initCoins();
    await Coins.updateLinks();
    console.log("Coins updated");
}
async function linkRefresher() {
    console.log("Updating links...");
    await Army.forAll();
    setTimeout(linkRefresher, 30 * 60 * 1000);
    console.log("Links updated");
}

function test() {

    const lookForAll = () => {
        console.log("looking ForAll");

        Army.forSameCoins();
        Army.forCoinCombinations();
        console.log("end lookForAll");
    };

    // Army.hikeLink('DGB', 'BTC');
    // Army.hikePath('DGB_BTC');
    // Army.hikePath('DGB_USDT_BTC');
    // Army.hikePath('DGB_BTC_DGB_USDT_BTC');
    // Army.hikePath('DGB_USDT_BTC_DGB');

    Army.hikePath('DOGE_USDT_BTC');
    const report = Army.hikePath('DGB_USDT_BTC').then(report => {
        console.log(`${report.sourceBalance} ${report.sourceCoin} -> ${report.finalBalance} ${report.finalCoin} -  ${report.path}`);
    });

    // Army.hikeLink('DGB', 'BTC');
    // lookForAll();

    // console.log(Elephant.getSortedPaths('DGB', 'BTC'));
}

async function app() {

    await coinRefresher();

    setInterval(coinRefresher, refreshInterval);
    API();
    linkRefresher();
    // test();
}

try {
    app();
} catch(e) {
    console.error(e);
}
