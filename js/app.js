/*
 * 创建一个包含所有卡片的数组
 */
let cards = []
cards = document.querySelectorAll('.card')

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

let icon = [];
for (let i = 0; i < cards.length; i++) {
    icon[i] = cards[i].querySelector('i');
    cards[i].querySelector('i').remove();
}
icon = shuffle(icon)
for (let i = 0; i < cards.length; i++) {
    cards[i].appendChild(icon[i]);
}

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        lastRoundoraryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        lastRoundoraryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = lastRoundoraryValue;
    }

    return array;
}
/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
let openStatus = [];
let lastRound;
let counter = 0;
let star = 3;
let time1 = 0,
    time2 = 0;

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        if (this.classList.contains('open') || this.classList.contains('match')) {
            console.log('click twice');
            return;
        } else {
            cards[i].classList.add('open', 'show');
            // add animation
            openStatus.push(cards[i]);
            if (openStatus.length == 1) {
                lastRound = cards[i];
            }
            // 当第二次翻开时
            if (openStatus.length > 1) {
                let a1 = cards[i].querySelector('i').classList.value;
                // 获取classList的value后对比值是否相同
                let a2 = openStatus[0].querySelector('i').classList.value;
                //翻开后延迟判断和盖上
                setTimeout(function () {
                    // console.log('开始延迟内的程序');
                    cards[i].classList.remove('open', 'show', 'flipInX', 'animated', 'shake');
                    lastRound.classList.remove('open', 'show', 'flipInX', 'animated', 'shake');
                    if (a1 == a2) {
                        cards[i].classList.add('match', 'bounce', 'animated');
                        lastRound.classList.add('match', 'bounce', 'animated');
                        console.log('match!');
                    }else{
                        cards[i].classList.add('animated', 'shake');
                        lastRound.classList.add('animated', 'shake');
                    }
                    // 清空数组
                    openStatus.length = 0;
                }, 1000);
            }

            // 判断是否获胜
            var win = 0;
            for (let j = 0; j < cards.length; j++) {
                var m = cards[j].classList.contains('match');
                if (m) {
                    win++
                }
            }

            // 星级评分判断
            if (counter == 30) {
                star--;
                document.querySelector('.stars').firstElementChild.remove()
            }
            if (counter == 50) {
                star--;
                document.querySelector('.stars').firstElementChild.remove()
            }

            // 胜利条件判断
            if (win == 14 && openStatus.length != 1) {
                // 结束时间
                let timer2 = new Date();
                time2 = timer2.getTime();
                stop()
                // 胜利结果显示
                alert(`You win!
                Time consumed: ${(time2-time1)/1000} seconds
                Star level: ${star}
                Click restart to play again!`)
            }

            // add 'moves' number

            counter++;
            // 调整 moves显示，翻两张卡片计算一次，用除以2取整方法
            document.querySelector('.moves').textContent = parseInt(counter / 2);
            if (counter == 1) {
                // 开始时间
                timer1 = new Date();
                time1 = timer1.getTime();
                start();
            }
        }
    })
}

// add 'restart function'
document.querySelector('.restart').addEventListener('click', function () {
    // 重新打乱排序并合上icon
    icon.length = 0;
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('open', 'show', 'match');
        icon[i] = cards[i].querySelector('i');
        cards[i].querySelector('i').remove();
    }
    icon = shuffle(icon)
    for (let i = 0; i < cards.length; i++) {
        cards[i].appendChild(icon[i]);
    }
    // 重置次数
    counter = 0;
    document.querySelector('.moves').textContent = counter;
    openStatus.length = 0;
    // 重置时间
    timer1 = new Date();
    time1 = timer1.getTime();
    Reset();
})

// time show
var hour, minute, second;
hour = minute = second = 0; 
var millisecond=0;
var int;
function Reset() //重置
{
    window.clearInterval(int);
    millisecond = hour = minute = second = 0;
    document.querySelector('.clockTimer').textContent = '用时：0时0分0秒';
}
function start() //开始
{
    int = setInterval(timer, 50);
    console.log('start');
}
function timer() //计时
{
    millisecond = millisecond + 50;
    if (millisecond >= 1000) {
        millisecond = 0;
        second = second + 1;
    }
    if (second >= 60) {
        second = 0;
        minute = minute + 1;
    }

    if (minute >= 60) {
        minute = 0;
        hour = hour + 1;
    }
    document.querySelector('.clockTimer').textContent = ('用时：' + hour + '时' + minute + '分' + second + '秒');
    console.log('12');
}
function stop() //暂停
{
    window.clearInterval(int);
}