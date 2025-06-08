// 获取画布和绘图上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 画布尺寸
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

// 蛇的每个方块大小
const blockSize = 20;
const rows = canvasSize / blockSize;
const cols = canvasSize / blockSize;

// 蛇的初始位置和方向
let snake = [
    { x: 5, y: 5 }
];
let direction = 'right';

// 食物的初始位置
let food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
};

// 游戏循环
function gameLoop() {
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制蛇
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
    });

    // 绘制食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);

    // 移动蛇
    let head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        // 生成新的食物
        food = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        };
    } else {
        // 移除蛇的尾部
        snake.pop();
    }

    // 检查是否撞到边界或自己
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        alert('游戏结束！');
        location.reload();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert('游戏结束！');
            location.reload();
        }
    }

    // 添加新的头部
    snake.unshift(head);

    // 定时调用游戏循环
    setTimeout(gameLoop, 100);
}

// 监听键盘事件
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

// 开始游戏
gameLoop();