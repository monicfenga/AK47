function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

// 随机数
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 从数组里取出count个随机元素
function randomSample(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

// array_search函数的JS实现
function findIndex(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) { // 判断是否匹配
            return i; // 返回匹配的索引
        }
    }
    return -1; // 没有匹配项，返回 -1
}

// 投骰子
function rollDice() {
    return randomInt(1, 6);//return Math.floor(Math.random() * 6) + 1;
}

//document.querySelector('input[name="player1_selected_card"]:checked').value;
//document.querySelector('input[name="player2_selected_card"]:checked').value;


// 定义

const MAX_HP = 20;

let player1 = {
    hp: MAX_HP,
    deck: []
};
let player2 = {
    hp: MAX_HP,
    deck: []
};
let shelf = {
    deck: []
}
var poker = ["黑桃A", "黑桃2", "黑桃3", "黑桃4", "黑桃5", "黑桃6", "黑桃7", "黑桃8", "黑桃9", "黑桃10", "黑桃J", "黑桃Q", "黑桃K",
    "红桃A", "红桃2", "红桃3", "红桃4", "红桃5", "红桃6", "红桃7", "红桃8", "红桃9", "红桃10", "红桃J", "红桃Q", "红桃K",
    "梅花A", "梅花2", "梅花3", "梅花4", "梅花5", "梅花6", "梅花7", "梅花8", "梅花9", "梅花10", "梅花J", "梅花Q", "梅花K",
    "方块A", "方块2", "方块3", "方块4", "方块5", "方块6", "方块7", "方块8", "方块9", "方块10", "方块J", "方块Q", "方块K"]

var round = 0;

// 游戏是否结束，true=结束
var gameEnd = false;

// 洗牌
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// 发牌
function deal(deck) {
    let hand = deck.splice(0, 4);
    return hand;
}

// 取出一张牌
function draw(deck) {
    let card = deck.shift();
    return card;
}

// 判断是否凑齐AK47
function isAK47(deck) {
    var combinedString = deck.join(""); // 将数组组合成一个字符串
    return combinedString.includes("A") && combinedString.includes("K") && combinedString.includes("4") && combinedString.includes("7");
}

//开始游戏
function ak47_action_start() {
    if (!gameEnd) {
        poker = shuffle(poker);
        poker = shuffle(poker);//洗牌两次，确保随机
        player1.deck = deal(poker);//发牌
        player2.deck = deal(poker);//发牌
        ak47_display_cards(player1.deck, "player1");//显示
        ak47_display_cards(player2.deck, "player2");//显示
    } 

    if (
        hasClass(document.getElementById('title_screen'), 'active')
        || hasClass(document.getElementById('howto_screen'), 'active')
    ) {
        removeClass(document.getElementById('title_screen'), 'active');
        removeClass(document.getElementById('title_screen'), 'active');
    }

    
    addClass(document.getElementById('game_screen'), 'active');
    addClass(document.getElementById('game_screen'), 'current-player1');
    ak47_action_check('player2');
}

function ak47_action_check(player) {
    if (gameEnd) {

        gameEnd = false;

        round = 0;

        player1 = {
            hp: MAX_HP,
            deck: []
        };
        player2 = {
            hp: MAX_HP,
            deck: []
        };
        shelf = {
            deck: []
        }
    } else {
        
    switch (player) {
        case 'player1':
            if (isAK47(player1.deck)) {
                alert('KALASNIKOV CYKA!');
                let damage = rollDice();
                player2.hp -= damage;
                alert('你获得了' + damage + '分！');
                if (player2.hp <= 0) {
                    gameEnd = true;
                    alert("玩家1胜利！");
                    removeClass(document.getElementById('game_screen'),'active');
                    addClass(document.getElementById('title_screen'),'active');
                }
            }
            document.getElementById('game_screen').classList.replace('current-player1','current-player2');
            break;
        case 'player2':
            if (isAK47(player2.deck)) {
                alert('KALASNIKOV CYKA!');
                let damage = rollDice();
                player1.hp -= damage;
                alert('你获得了' + damage + '分！');
                if (player1.hp <= 0) {
                    gameEnd = true;
                    alert("玩家2胜利！");
                    removeClass(document.getElementById('game_screen'),'active');
                    addClass(document.getElementById('title_screen'),'active');
                }
            }

            document.getElementById('game_screen').classList.replace('current-player2', 'current-player1');
            break;
        default:
            // do nothing
            break;
        }
    }

    round++;
    document.getElementById('round').innerText = round;
    document.getElementById('player1_hp').innerText = MAX_HP - player1.hp;
    document.getElementById('player2_hp').innerText = MAX_HP - player2.hp;
}

// 显示卡片
function ak47_display_cards(deck, target) {
    target_deck = "#" + target + " .deck";
    document.querySelector(target_deck).innerHTML = '';
    deck.forEach(function (card, index) {
        var liItem = document.createElement("li"); // 创建 li 元素
        liItem.setAttribute("class", "deck__card");

        var labelItem = document.createElement("label");
        labelItem.setAttribute("for", target + "_selected_card_" + index);
        labelItem.setAttribute("class", "deck__cardInner");

        var inputItem = document.createElement("input"); // 单选框
        inputItem.setAttribute("type", "radio");
        inputItem.setAttribute("name", target + "_selected_card");
        inputItem.setAttribute("value", card);
        inputItem.setAttribute("id", target + "_selected_card_" + index);

        var emItem = document.createElement("i"); // 花色
        switch (card.substr(0, 2)) {
            case '黑桃':
                emItem.textContent = '♠';
                break;
            case '红桃':
                emItem.textContent = '♥';
                break;
            case '梅花':
                emItem.textContent = '♣';
                break;
            case '方块':
                emItem.textContent = '♦';
                break;
            default:
                emItem.textContent = card.substr(0, 2)
                break;
        }

        var bItem = document.createElement("b"); // 数字
        bItem.textContent = card.substr(2);

        labelItem.appendChild(inputItem);
        labelItem.appendChild(emItem);
        labelItem.appendChild(bItem);

        liItem.appendChild(labelItem);
        document.querySelector(target_deck).appendChild(liItem); // 添加到牌组ul里
    });
}

function ak47_display_hp(hp, target) {
    
}

function ak47_action_skip_round(player) {
    ak47_action_check(player);
}

function ak47_action_dropAndGrabNewCardFromPile(player) {
    switch (player) {
        case 'player1':
            the_deck = player1.deck;
            break;
        case 'player2':
            the_deck = player2.deck;
            break;
        default:
            // do nothing
            break;
    }
    selected_value = document.querySelector('input[name="' + player + '_selected_card"]:checked').value;
    selected_card = findIndex(the_deck, selected_value);
    the_deck[selected_card] = draw(poker);
    switch (player) {
        case 'player1':
            player1.deck = the_deck;
            break;
        case 'player2':
            player2.deck = the_deck;
            break;
        default:
            // do nothing
            break;
    }
    ak47_action_check(player);
    ak47_display_cards(the_deck,player);
}
function ak47_action_dropAndGrabNewCardFromShelf(player) {
    if (shelf.deck.length === 0) {
        return false;
    }
    switch (player) {
        case 'player1':
            the_deck = player1.deck;
            break;
        case 'player2':
            the_deck = player2.deck;
            break;
        default:
            // do nothing
            break;
    }
    selected_value = document.querySelector('input[name="' + player + '_selected_card"]:checked').value;
    selected_card = findIndex(the_deck, selected_value);
    the_deck[selected_card] = shelf.deck.pop();
    switch (player) {
        case 'player1':
            player1.deck = the_deck;
            break;
        case 'player2':
            player2.deck = the_deck;
            break;
        default:
            // do nothing
            break;
    }
    ak47_action_check(player);
    ak47_display_cards(the_deck, player);
    ak47_display_cards(shelf.deck, 'shelf');
}

function ak47_action_moveToShelfAndGrabNewCardFromPile(player) {
    switch (player) {
        case 'player1':
            the_deck = player1.deck;
            break;
        case 'player2':
            the_deck = player2.deck;
            break;
        default:
            // do nothing
            break;
    }
    selected_value = document.querySelector('input[name="' + player + '_selected_card"]:checked').value;
    selected_card = findIndex(the_deck, selected_value);
    shelf.deck.push(selected_value);
    the_deck[selected_card] = draw(poker);
    switch (player) {
        case 'player1':
            player1.deck = the_deck;
            break;
        case 'player2':
            player2.deck = the_deck;
            break;
        default:
            // do nothing
            break;
    }
    ak47_action_check(player);
    ak47_display_cards(the_deck, player);
    ak47_display_cards(shelf.deck, 'shelf');
}

function ak47_action_swapDeckAndShelf(player) {
    if (shelf.deck.length === 0) {
        // 如果架子上没有卡，就阻止玩家
        return false;
    }
    switch (player) {
        case 'player1':
            the_deck = player1.deck;
            break;
        case 'player2':
            the_deck = player2.deck;
            break;
        default:
            // do nothing
            break;
    }
    selected_value = document.querySelector('input[name="' + player + '_selected_card"]:checked').value;
    selected_card = findIndex(the_deck, selected_value);
    the_deck[selected_card] = shelf.deck.pop();
    shelf.deck.push(selected_value);
    switch (player) {
        case 'player1':
            player1.deck = the_deck;
            break;
        case 'player2':
            player2.deck = the_deck;
            break;
        default:
            // do nothing
            break;
    }
    ak47_action_check(player);
    ak47_display_cards(the_deck, player);
    ak47_display_cards(shelf.deck, 'shelf');
}
