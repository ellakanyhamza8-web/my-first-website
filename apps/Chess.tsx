import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { RotateCcw } from 'lucide-react';

interface ChessAppProps {
  lang: Language;
}

// Pieces Unicode
const PIECES: Record<string, string> = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

const INITIAL_BOARD = [
  ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
  ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
  ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
];

type Position = { r: number; c: number };

export const ChessApp: React.FC<ChessAppProps> = ({ lang }) => {
  const t = translations[lang];
  const [board, setBoard] = useState<string[][]>(INITIAL_BOARD.map(row => [...row]));
  const [selected, setSelected] = useState<Position | null>(null);
  const [turn, setTurn] = useState<'w' | 'b'>('w');
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  // Helper: check boundaries
  const isValidPos = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;

  // Simplified Move Logic (No castling/en passant/pin checks for code brevity in this demo)
  const getMoves = (r: number, c: number, boardState: string[][]): Position[] => {
    const piece = boardState[r][c];
    if (!piece) return [];
    const color = piece[0];
    const type = piece[1];
    const moves: Position[] = [];

    const addMove = (nr: number, nc: number) => {
      if (isValidPos(nr, nc)) {
        const target = boardState[nr][nc];
        if (!target || target[0] !== color) {
           moves.push({ r: nr, c: nc });
           return !!target; // Stop if capture
        }
      }
      return true; // Stop (blocked by own piece)
    };

    if (type === 'P') {
      const dir = color === 'w' ? -1 : 1;
      const startRow = color === 'w' ? 6 : 1;
      // Forward 1
      if (isValidPos(r + dir, c) && !boardState[r + dir][c]) {
        moves.push({ r: r + dir, c });
        // Forward 2
        if (r === startRow && !boardState[r + dir * 2][c]) {
          moves.push({ r: r + dir * 2, c });
        }
      }
      // Captures
      [[r + dir, c - 1], [r + dir, c + 1]].forEach(([nr, nc]) => {
        if (isValidPos(nr, nc)) {
          const target = boardState[nr][nc];
          if (target && target[0] !== color) moves.push({ r: nr, c: nc });
        }
      });
    } else if (type === 'N') {
      const jumps = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
      jumps.forEach(([dr, dc]) => addMove(r + dr, c + dc));
    } else if (type === 'K') {
      const steps = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
      steps.forEach(([dr, dc]) => addMove(r + dr, c + dc));
    } else {
      // Sliders: R, B, Q
      const directions = [];
      if (type === 'R' || type === 'Q') directions.push([0, 1], [0, -1], [1, 0], [-1, 0]);
      if (type === 'B' || type === 'Q') directions.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
      
      directions.forEach(([dr, dc]) => {
        let nr = r + dr;
        let nc = c + dc;
        while (isValidPos(nr, nc)) {
          const target = boardState[nr][nc];
          if (!target) {
            moves.push({ r: nr, c: nc });
          } else {
            if (target[0] !== color) moves.push({ r: nr, c: nc });
            break; // Blocked
          }
          nr += dr;
          nc += dc;
        }
      });
    }
    return moves;
  };

  const handleSquareClick = (r: number, c: number) => {
    if (winner || turn === 'b') return; // Wait for AI

    const piece = board[r][c];
    
    // Select Piece
    if (piece && piece[0] === 'w') {
      setSelected({ r, c });
      setPossibleMoves(getMoves(r, c, board));
      return;
    }

    // Move Piece
    if (selected) {
      const isMoveValid = possibleMoves.some(m => m.r === r && m.c === c);
      if (isMoveValid) {
        movePiece(selected.r, selected.c, r, c);
        setSelected(null);
        setPossibleMoves([]);
      } else {
        // Deselect if clicking empty or invalid
        setSelected(null);
        setPossibleMoves([]);
      }
    }
  };

  const movePiece = (fromR: number, fromC: number, toR: number, toC: number) => {
    const newBoard = board.map(row => [...row]);
    let piece = newBoard[fromR][fromC];
    
    // Auto-Queen Promotion for simplicity
    if (piece[1] === 'P' && (toR === 0 || toR === 7)) {
       piece = piece[0] + 'Q';
    }

    // Check for King Capture (Simple win condition)
    if (newBoard[toR][toC].includes('K')) {
        setWinner(piece[0] === 'w' ? 'White' : 'Black');
    }

    newBoard[toR][toC] = piece;
    newBoard[fromR][fromC] = '';
    setBoard(newBoard);
    setTurn(prev => prev === 'w' ? 'b' : 'w');
  };

  // AI Logic
  useEffect(() => {
    if (turn === 'b' && !winner) {
      const timer = setTimeout(() => {
        // Find all black pieces
        const myPieces: Position[] = [];
        board.forEach((row, r) => row.forEach((p, c) => {
          if (p && p[0] === 'b') myPieces.push({ r, c });
        }));

        if (myPieces.length === 0) return; // Should not happen unless wiped out

        // Collect all valid moves
        let allMoves: { from: Position, to: Position, score: number }[] = [];
        
        myPieces.forEach(pos => {
          const moves = getMoves(pos.r, pos.c, board);
          moves.forEach(to => {
             let score = 0;
             const target = board[to.r][to.c];
             if (target) {
                 // Capture logic: prioritize King > Queen > Rook > Bishop/Knight > Pawn
                 if (target.includes('K')) score = 1000;
                 else if (target.includes('Q')) score = 90;
                 else if (target.includes('R')) score = 50;
                 else if (target.includes('B') || target.includes('N')) score = 30;
                 else score = 10;
             }
             // Small randomness to make it less predictable
             score += Math.random() * 5;
             allMoves.push({ from: pos, to, score });
          });
        });

        if (allMoves.length > 0) {
          // Sort by score desc
          allMoves.sort((a, b) => b.score - a.score);
          const bestMove = allMoves[0];
          movePiece(bestMove.from.r, bestMove.from.c, bestMove.to.r, bestMove.to.c);
        } else {
            // No moves? Stalemate or checkmate logic simplified
            setTurn('w'); 
        }

      }, 500);
      return () => clearTimeout(timer);
    }
  }, [turn, board, winner]);

  const restart = () => {
    setBoard(INITIAL_BOARD.map(row => [...row]));
    setTurn('w');
    setWinner(null);
    setSelected(null);
    setPossibleMoves([]);
  };

  return (
    <div className="h-full bg-[#262421] flex flex-col items-center justify-center p-4 text-white select-none">
      <div className="mb-4 flex justify-between w-full max-w-[400px] items-center">
         <div className={`px-4 py-2 rounded ${turn === 'w' ? 'bg-[#E95420]' : 'bg-gray-700'}`}>
            {t.whiteTurn}
         </div>
         <div className={`px-4 py-2 rounded ${turn === 'b' ? 'bg-[#E95420]' : 'bg-gray-700'}`}>
            {t.blackTurn}
         </div>
      </div>

      <div className="relative border-8 border-[#484644] rounded-sm shadow-2xl">
        <div className="grid grid-cols-8 w-[320px] h-[320px] md:w-[480px] md:h-[480px]">
          {board.map((row, r) => 
            row.map((piece, c) => {
              const isDark = (r + c) % 2 === 1;
              const isSelected = selected?.r === r && selected?.c === c;
              const isPossible = possibleMoves.some(m => m.r === r && m.c === c);
              
              return (
                <div 
                  key={`${r}-${c}`}
                  onClick={() => handleSquareClick(r, c)}
                  className={`
                    flex items-center justify-center text-4xl md:text-6xl cursor-pointer relative
                    ${isSelected ? 'bg-yellow-200/50' : isDark ? 'bg-[#769656]' : 'bg-[#eeeed2]'}
                  `}
                >
                  {/* Position Dot */}
                  {isPossible && (
                     <div className={`absolute w-3 h-3 md:w-5 md:h-5 rounded-full ${piece ? 'border-4 border-black/20' : 'bg-black/20'}`}></div>
                  )}
                  
                  {/* Piece */}
                  <span className={`${piece.startsWith('w') ? 'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]' : 'text-black drop-shadow-[0_0_1px_rgba(255,255,255,0.5)]'} z-10 font-serif leading-none`}>
                    {PIECES[piece]}
                  </span>
                </div>
              );
            })
          )}
        </div>
        
        {winner && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center animate-fadeIn z-50">
                <h2 className="text-3xl font-bold mb-4 text-[#E95420]">{winner} Wins!</h2>
                <button onClick={restart} className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                    <RotateCcw size={18} /> {t.restartGame}
                </button>
            </div>
        )}
      </div>

      <div className="mt-6 text-gray-400 text-sm">
         HamzaOS Chess Engine v1.0
      </div>
    </div>
  );
};