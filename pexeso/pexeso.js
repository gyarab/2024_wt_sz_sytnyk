const imageUrls = [
    'https://placedog.net/400/237?id=144',
    'https://placedog.net/400/379?id=203',
    'https://placedog.net/400/296?id=28',
    'https://placedog.net/400/398?id=65',
    'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1588095210434-3a062445f093?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1526660690293-bcd32dc3b123?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://placedog.net/400/237?id=144',
    'https://placedog.net/400/379?id=203',
    'https://placedog.net/400/296?id=28',
    'https://placedog.net/400/398?id=65',
    'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1588095210434-3a062445f093?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1526660690293-bcd32dc3b123?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

let board = [];
let firstCard = null;
let secondCard = null;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(imageUrls);
    board = imageUrls.map(image => ({ image, revealed: false, matched: false }));
}

function renderBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';

    board.forEach((card, index) => {
        if (card.matched) return;

        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.revealed ? 'revealed' : 'hidden'}`;

        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        cardElement.appendChild(imgElement);

        cardElement.onclick = () => handleCardClick(index);
        boardElement.appendChild(cardElement);
    });
}


function handleCardClick(index) {
    const card = board[index];
    if (card.revealed || card.matched || secondCard) return;

    card.revealed = true;
    renderBoard();

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        if (firstCard.image === secondCard.image) {
            firstCard.matched = true;
            secondCard.matched = true;
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
            setTimeout(() => {
                firstCard = null;
                secondCard = null;
                renderBoard();
            }, 1000);
        } else {
            setTimeout(() => {
                firstCard.revealed = false;
                secondCard.revealed = false;
                firstCard = null;
                secondCard = null;
                renderBoard();
            }, 1000);
        }
    }
}



document.getElementById('reset-button').onclick = () => {
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    createBoard();
    renderBoard();
};

createBoard();
renderBoard();

