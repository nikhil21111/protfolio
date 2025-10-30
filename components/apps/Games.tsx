"use client";

import { useState, useEffect, useRef } from "react";

const games = [
  {
    id: "tictactoe",
    name: "Tic-Tac-Toe",
    icon: "⭕",
    description: "Classic X and O game",
    color: "from-blue-400 to-cyan-400",
  },
  {
    id: "snake",
    name: "Snake",
    icon: "🐍",
    description: "Eat apples and grow!",
    color: "from-green-400 to-emerald-400",
  },
  {
    id: "memory",
    name: "Memory Match",
    icon: "🎴",
    description: "Find matching pairs",
    color: "from-purple-400 to-pink-400",
  },
  {
    id: "guess",
    name: "Number Guess",
    icon: "�",
    description: "Guess the number!",
    color: "from-orange-400 to-red-400",
  },
];

// Tic-Tac-Toe Component
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(calculateWinner(newBoard));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const isBoardFull = board.every((cell) => cell !== null);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-lg font-bold">
        {winner ? (
          <span className="text-green-600 animate-pulse">🎉 Winner: {winner}! 🎉</span>
        ) : isBoardFull ? (
          <span className="text-orange-600">It&apos;s a Draw!</span>
        ) : (
          <span>Next Player: <span className={isXNext ? "text-blue-600" : "text-red-600"}>{isXNext ? "X" : "O"}</span></span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`win95-button w-20 h-20 text-3xl font-bold ${
              cell === "X" ? "text-blue-600" : "text-red-600"
            } hover:scale-105 transition-transform`}
          >
            {cell}
          </button>
        ))}
      </div>
      <button onClick={resetGame} className="win95-button px-6 py-2 font-bold">
        🔄 New Game
      </button>
    </div>
  );
}

// Snake Game Component
function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const snakeRef = useRef([[5, 5]]);
  const directionRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef({ x: 10, y: 10 });
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const gridSize = 20;
  const cellSize = 15;

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const { x, y } = directionRef.current;
      switch (e.key) {
        case "ArrowUp":
          if (y === 0) directionRef.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (y === 0) directionRef.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (x === 0) directionRef.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (x === 0) directionRef.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    gameLoopRef.current = setInterval(() => {
      const snake = snakeRef.current;
      const head = snake[0];
      const newHead = [
        head[0] + directionRef.current.x,
        head[1] + directionRef.current.y,
      ];

      // Check collision with walls
      if (
        newHead[0] < 0 || newHead[0] >= gridSize ||
        newHead[1] < 0 || newHead[1] >= gridSize
      ) {
        setGameOver(true);
        return;
      }

      // Check collision with self
      if (snake.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...snake];

      // Check if food eaten
      if (newHead[0] === foodRef.current.x && newHead[1] === foodRef.current.y) {
        setScore((s) => s + 10);
        foodRef.current = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        };
      } else {
        newSnake.pop();
      }

      snakeRef.current = newSnake;
      drawGame();
    }, 150);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameStarted, gameOver]);

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#e0e0e0";
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, gridSize * cellSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(gridSize * cellSize, i * cellSize);
      ctx.stroke();
    }

    // Draw snake
    snakeRef.current.forEach(([x, y], i) => {
      ctx.fillStyle = i === 0 ? "#10b981" : "#34d399";
      ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
    });

    // Draw food
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(
      foodRef.current.x * cellSize,
      foodRef.current.y * cellSize,
      cellSize - 1,
      cellSize - 1
    );
  };

  const startGame = () => {
    snakeRef.current = [[5, 5]];
    directionRef.current = { x: 1, y: 0 };
    foodRef.current = { x: 10, y: 10 };
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  useEffect(() => {
    if (gameStarted && !gameOver) drawGame();
  }, [gameStarted]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-between w-full max-w-xs">
        <span className="font-bold text-lg">Score: <span className="text-green-600">{score}</span></span>
        {gameOver && <span className="text-red-600 font-bold animate-pulse">Game Over!</span>}
      </div>
      <div className="win95-border-inset p-2 bg-gray-100">
        <canvas
          ref={canvasRef}
          width={gridSize * cellSize}
          height={gridSize * cellSize}
          className="block"
        />
      </div>
      {!gameStarted || gameOver ? (
        <button onClick={startGame} className="win95-button px-6 py-2 font-bold">
          {gameOver ? "🔄 Play Again" : "▶️ Start Game"}
        </button>
      ) : (
        <p className="text-xs text-gray-600">Use arrow keys to move!</p>
      )}
    </div>
  );
}

// Memory Match Game Component
function MemoryGame() {
  const emojis = ["🎮", "🎨", "🎵", "🎬", "📱", "💻", "🚀", "⚡"];
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          setIsWon(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-between w-full max-w-md">
        <span className="font-bold">Moves: <span className="text-blue-600">{moves}</span></span>
        {isWon && <span className="text-green-600 font-bold animate-pulse">🎉 You Won! 🎉</span>}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`win95-button w-16 h-16 text-2xl transition-all ${
              flipped.includes(index) || matched.includes(index)
                ? "win95-border-inset"
                : "hover:scale-105"
            }`}
          >
            {flipped.includes(index) || matched.includes(index) ? card : "❓"}
          </button>
        ))}
      </div>
      <button onClick={initGame} className="win95-button px-6 py-2 font-bold">
        🔄 New Game
      </button>
    </div>
  );
}

// Number Guessing Game Component
function GuessGame() {
  const [target, setTarget] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100!");
  const [attempts, setAttempts] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage("⚠️ Please enter a valid number between 1 and 100!");
      return;
    }

    setAttempts(attempts + 1);
    setHistory([...history, num]);

    if (num === target) {
      setMessage(`🎉 Correct! You won in ${attempts + 1} attempts! 🏆`);
      setIsWon(true);
    } else if (num < target) {
      setMessage(`📈 Too low! Try a higher number. (You guessed ${num})`);
    } else {
      setMessage(`📉 Too high! Try a lower number. (You guessed ${num})`);
    }
    setGuess("");
  };

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("🎯 Guess a number between 1 and 100!");
    setAttempts(0);
    setIsWon(false);
    setHistory([]);
  };

  return (
    <div className="flex flex-col items-center space-y-4 max-w-md">
      <div className="win95-border p-4 bg-gradient-to-r from-orange-50 to-red-50 w-full text-center relative overflow-hidden">
        <div className="absolute top-2 left-2 text-4xl opacity-20 animate-bounce">🎯</div>
        <div className="absolute bottom-2 right-2 text-4xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>🎲</div>
        <p className={`font-bold text-lg relative z-10 ${isWon ? "text-green-600 animate-pulse" : "text-gray-700"}`}>
          {message}
        </p>
      </div>
      
      <div className="flex items-center space-x-2 w-full">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleGuess()}
          disabled={isWon}
          className="win95-border-inset px-4 py-2 flex-1 text-center text-lg font-bold"
          placeholder="🔢 Enter number..."
          min="1"
          max="100"
        />
        <button
          onClick={handleGuess}
          disabled={isWon}
          className="win95-button px-6 py-2 font-bold hover:scale-105 transition-transform"
        >
          🎯 Guess
        </button>
      </div>

      <div className="win95-border-inset p-3 bg-white w-full">
        <p className="text-sm font-bold mb-2 flex items-center gap-2">
          <span className="text-blue-600">📊</span> Attempts: {attempts}
        </p>
        {history.length > 0 && (
          <>
            <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
              <span>📝</span> Previous guesses:
            </p>
            <div className="flex flex-wrap gap-1">
              {history.map((h, i) => (
                <span
                  key={i}
                  className={`win95-button text-xs px-2 py-1 ${
                    h < target ? 'text-red-600' : h > target ? 'text-blue-600' : 'text-green-600'
                  }`}
                >
                  {h < target && '↑'} {h > target && '↓'} {h === target && '✓'} {h}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <button onClick={resetGame} className="win95-button px-6 py-2 font-bold hover:scale-105 transition-transform">
        🔄 New Game
      </button>
    </div>
  );
}

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const renderGame = () => {
    switch (selectedGame) {
      case "tictactoe":
        return <TicTacToe />;
      case "snake":
        return <SnakeGame />;
      case "memory":
        return <MemoryGame />;
      case "guess":
        return <GuessGame />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-4 overflow-auto h-full relative">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            🎮
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="win95-border p-4 bg-gradient-to-r from-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-loading"></div>
        <h2 className="text-2xl font-bold mb-2 text-win95-blue flex items-center gap-2">
          🎮 <span className="animate-pulse">Retro Game Arcade</span>
        </h2>
        <p className="text-sm text-gray-700">Take a break and play some classic games!</p>
      </div>

      {!selectedGame ? (
        <div className="grid grid-cols-2 gap-3 relative z-10">
          {games.map((game, idx) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className="win95-border p-6 bg-white hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              style={{ animation: `popIn 0.4s ease-out ${idx * 0.1}s both` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className="relative z-10">
                <div className="text-5xl mb-3 group-hover:animate-bounce">{game.icon}</div>
                <h3 className="font-bold text-lg mb-1">{game.name}</h3>
                <p className="text-xs text-gray-600">{game.description}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="win95-border p-6 bg-white relative z-10 animate-slideInUp">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-2xl flex items-center gap-2">
              <span className="text-3xl">{games.find((g) => g.id === selectedGame)?.icon}</span>
              {games.find((g) => g.id === selectedGame)?.name}
            </h3>
            <button
              onClick={() => setSelectedGame(null)}
              className="win95-button px-4 py-2 font-bold hover:scale-105 transition-transform"
            >
              ← Back
            </button>
          </div>
          <div className="win95-border-inset bg-gradient-to-br from-gray-50 to-blue-50 p-6">
            {renderGame()}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          70% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
          }
        }
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
