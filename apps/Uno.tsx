import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { RotateCcw, User, Bot, Play } from 'lucide-react';

interface UnoAppProps {
  lang: Language;
}

type Color = 'red' | 'blue' | 'green' | 'yellow' | 'black';
type Type = 'number' | 'skip' | 'reverse' | 'draw2' | 'wild' | 'wild4';

interface Card {
  id: string;
  color: Color;
  type: Type;
  value?: number; // 0-9
}

const COLORS: Color[] = ['red', 'blue', 'green', 'yellow'];

const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  let id = 0;
  
  COLORS.forEach(color => {
    // 1 zero
    deck.push({ id: `c-${id++}`, color, type: 'number', value: 0 });
    // 2 of 1-9
    for (let i = 1; i <= 9; i++) {
       deck.push({ id: `c-${id++}`, color, type: 'number', value: i });
       deck.push({ id: `c-${id++}`, color, type: 'number', value: i });
    }
    // Action Cards (2 each)
    ['skip', 'reverse', 'draw2'].forEach(type => {
        deck.push({ id: `c-${id++}`, color, type: type as Type });
        deck.push({ id: `c-${id++}`, color, type: type as Type });
    });
  });

  // Wild Cards (4 each)
  for (let i = 0; i < 4; i++) {
      deck.push({ id: `c-${id++}`, color: 'black', type: 'wild' });
      deck.push({ id: `c-${id++}`, color: 'black', type: 'wild4' });
  }

  return deck.sort(() => Math.random() - 0.5);
};

export const UnoApp: React.FC<UnoAppProps> = ({ lang }) => {
  const t = translations[lang];
  
  // Game State
  const [deck, setDeck] = useState<Card[]>([]);
  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [players, setPlayers] = useState<Card[][]>([[], [], [], []]); // 0 is Human
  const [turn, setTurn] = useState(0); // 0, 1, 2, 3
  const [direction, setDirection] = useState(1); // 1 or -1
  const [currentColor, setCurrentColor] = useState<Color>('red'); // Current active color (handles wild)
  const [winner, setWinner] = useState<number | null>(null);
  const [log, setLog] = useState('');
  const [choosingColor, setChoosingColor] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize Game
  const startGame = () => {
    const newDeck = generateDeck();
    const newPlayers: Card[][] = [[], [], [], []];
    
    // Deal 7 cards
    for(let i=0; i<7; i++) {
        for(let p=0; p<4; p++) {
            newPlayers[p].push(newDeck.pop()!);
        }
    }

    // Start pile
    let startCard = newDeck.pop()!;
    while (startCard.color === 'black') {
        newDeck.unshift(startCard); // Put back wild
        newDeck.sort(() => Math.random() - 0.5); // Reshuffle
        startCard = newDeck.pop()!;
    }

    setDeck(newDeck);
    setPlayers(newPlayers);
    setDiscardPile([startCard]);
    setCurrentColor(startCard.color);
    setTurn(0);
    setWinner(null);
    setDirection(1);
    setLog('Game Started!');
    setGameStarted(true);
    setChoosingColor(false);
  };

  // Turn Logic Loop
  useEffect(() => {
    if (!gameStarted || winner !== null) return;

    if (turn !== 0) {
        // AI Turn
        const timer = setTimeout(() => {
            playAITurn();
        }, 1500);
        return () => clearTimeout(timer);
    }
  }, [turn, gameStarted, winner]);

  const getNextTurn = (skip: boolean = false) => {
      let next = turn + (direction * (skip ? 2 : 1));
      // Normalize mod 4
      return (next % 4 + 4) % 4;
  };

  const drawCard = (playerIdx: number, count: number = 1) => {
      const newDeck = [...deck];
      const newPlayers = [...players];
      const drawnCards: Card[] = [];

      // Refill deck if empty
      if (newDeck.length < count) {
          if (discardPile.length > 1) {
              const top = discardPile[discardPile.length-1];
              const rest = discardPile.slice(0, discardPile.length-1).sort(() => Math.random() - 0.5);
              // Reset card colors to black for wilds if needed? No, keep logic simple
              // Actually wilds should reset to black if reused? 
              // Simplification: Just reshuffle discard into deck
              const recycled = rest.map(c => (c.type.startsWith('wild') ? { ...c, color: 'black' as Color } : c));
              newDeck.push(...recycled);
              setDiscardPile([top]);
          }
      }

      for(let i=0; i<count; i++) {
          if (newDeck.length > 0) {
            const c = newDeck.pop()!;
            newPlayers[playerIdx].push(c);
            drawnCards.push(c);
          }
      }
      
      setDeck(newDeck);
      setPlayers(newPlayers);
      return drawnCards;
  };

  const playCard = (playerIdx: number, card: Card, wildColor?: Color) => {
     const newPlayers = [...players];
     const handIndex = newPlayers[playerIdx].findIndex(c => c.id === card.id);
     if (handIndex === -1) return; // Error

     // Remove from hand
     newPlayers[playerIdx].splice(handIndex, 1);
     setPlayers(newPlayers);

     // Add to discard
     // If Wild, visually keep it black in pile but logic uses wildColor?
     // Actually usually you place the wild card down. Logic tracks effective color.
     setDiscardPile(prev => [...prev, card]);

     // Check Win
     if (newPlayers[playerIdx].length === 0) {
         setWinner(playerIdx);
         setLog(`Player ${playerIdx === 0 ? 'You' : playerIdx} ${t.unoWin}`);
         return;
     }

     // Apply Effects
     let skip = false;
     let nextDir = direction;
     let nextColor = card.color;

     if (card.type === 'wild' || card.type === 'wild4') {
         nextColor = wildColor || 'red'; // Should be provided
         setLog(playerIdx === 0 ? `You chose ${nextColor}` : `Bot ${playerIdx} chose ${nextColor}`);
     } else {
         setLog(`Played ${card.color} ${card.type === 'number' ? card.value : card.type}`);
     }

     if (card.type === 'reverse') {
         nextDir *= -1;
         // Special case: 2 players reverse acts as skip. Here 4 players, just direction change.
     }
     if (card.type === 'skip') {
         skip = true;
         setLog('Skipped next player!');
     }
     if (card.type === 'draw2') {
         const nextP = (turn + nextDir) % 4; // Use raw next, normalize later
         const target = (nextP + 4) % 4;
         drawCard(target, 2);
         skip = true; // Usually Draw 2 skips the person drawing
         setLog('Next player draws 2!');
     }
     if (card.type === 'wild4') {
         const nextP = (turn + nextDir) % 4;
         const target = (nextP + 4) % 4;
         drawCard(target, 4);
         skip = true;
         setLog('Next player draws 4!');
     }

     setCurrentColor(nextColor);
     setDirection(nextDir);
     
     // Calculate Next Turn
     let nextTurnIndex = turn + (nextDir * (skip ? 2 : 1));
     nextTurnIndex = (nextTurnIndex % 4 + 4) % 4;
     setTurn(nextTurnIndex);
  };

  const isValidPlay = (card: Card) => {
      // Match Color
      if (card.color === currentColor) return true;
      // Match Value/Type (if not wild)
      const top = discardPile[discardPile.length-1];
      if (card.color !== 'black' && top.color !== 'black') {
          if (card.type === top.type) {
             if (card.type === 'number') return card.value === top.value;
             return true; // Action cards match by symbol
          }
      }
      // Match by Symbol even if color different? Yes if previous was Wild but current effective color matches card color.
      // Logic simplified:
      // 1. Matches active Color (handled above)
      // 2. Matches Card Type AND (Value OR Symbol) - if Type matches top card visual type
      if (card.type === top.type && card.type !== 'wild' && card.type !== 'wild4') {
          if (card.type === 'number') return card.value === top.value;
          return true;
      }

      // Wilds always valid
      if (card.color === 'black') return true;

      return false;
  };

  // Human Interaction
  const handleCardClick = (card: Card) => {
      if (turn !== 0 || choosingColor) return;
      
      if (isValidPlay(card)) {
          if (card.color === 'black') {
              setChoosingColor(true); // Show UI to pick color
              // Store pending card? simpler:
              // Just wait for color pick, then execute play
              // We need to know WHICH card was clicked for the color picker callback
              // For simplicity, let's use a ref or temp state
              tempSelectedCard.current = card;
          } else {
              playCard(0, card);
          }
      } else {
          setLog("Can't play that card!");
      }
  };

  const tempSelectedCard = useRef<Card | null>(null);

  const handleColorPick = (c: Color) => {
      if (tempSelectedCard.current) {
          playCard(0, tempSelectedCard.current, c);
          setChoosingColor(false);
          tempSelectedCard.current = null;
      }
  };

  const handleDrawClick = () => {
      if (turn !== 0 || choosingColor) return;
      // Check if user has playable card? Usually forced play isn't required but optional.
      // Rule: Draw 1. If playable, can play. If not, pass.
      // For simplicity: Draw 1, if playable auto play? Or just add to hand and pass turn?
      // Simple Rule: Draw 1. Pass Turn.
      drawCard(0, 1);
      
      // Auto pass for simplicity or check if playable?
      // Let's keep it simple: Draw = Pass turn effectively in this speed version
      setTurn(getNextTurn(false));
      setLog(t.unoDraw);
  };

  // AI Logic
  const playAITurn = () => {
      const hand = players[turn];
      const validCards = hand.filter(isValidPlay);

      if (validCards.length > 0) {
          // AI Strategy: Play Action/Wilds first or random?
          // Simple: Play first valid, prefer color match to save wild?
          // Prefer non-wilds first to save them?
          validCards.sort((a, b) => {
              if (a.color === 'black') return 1; // Play wilds last
              return -1;
          });
          
          const choice = validCards[0];
          let chosenColor: Color = 'red';
          if (choice.color === 'black') {
              // Pick random color or most abundant
              chosenColor = COLORS[Math.floor(Math.random()*4)];
          }
          playCard(turn, choice, chosenColor);
      } else {
          drawCard(turn, 1);
          setLog(`Bot ${turn} drew a card`);
          setTurn(getNextTurn(false));
      }
  };

  // Render Helpers
  const renderCard = (card: Card, playable: boolean = false, hidden: boolean = false) => {
      if (hidden) {
          return (
              <div className="w-12 h-16 md:w-16 md:h-24 bg-black border-2 border-white rounded-lg shadow-md flex items-center justify-center">
                  <div className="w-8 h-12 border-2 border-red-500 rounded-full rotate-45"></div>
              </div>
          );
      }

      let bgColor = '';
      let textColor = 'text-white';
      switch(card.color) {
          case 'red': bgColor = 'bg-red-500'; break;
          case 'blue': bgColor = 'bg-blue-500'; break;
          case 'green': bgColor = 'bg-green-500'; break;
          case 'yellow': bgColor = 'bg-yellow-400'; textColor = 'text-black'; break;
          case 'black': bgColor = 'bg-black'; break;
      }

      let content = '';
      if (card.type === 'number') content = String(card.value);
      else if (card.type === 'skip') content = '🚫';
      else if (card.type === 'reverse') content = '⇄';
      else if (card.type === 'draw2') content = '+2';
      else if (card.type === 'wild') content = '🌈';
      else if (card.type === 'wild4') content = '+4';

      return (
          <div 
             className={`
                w-12 h-16 md:w-20 md:h-28 rounded-lg shadow-lg flex flex-col items-center justify-center font-bold text-xl md:text-3xl relative
                ${bgColor} ${textColor} border-2 border-white select-none transition-transform
                ${playable ? 'cursor-pointer hover:-translate-y-4 hover:z-10' : ''}
             `}
             onClick={() => !hidden && playable ? handleCardClick(card) : null}
          >
              <span className="drop-shadow-md">{content}</span>
              <span className="absolute top-1 left-1 text-[8px] md:text-xs opacity-80">{content}</span>
              <span className="absolute bottom-1 right-1 text-[8px] md:text-xs opacity-80 rotate-180">{content}</span>
          </div>
      );
  };

  if (!gameStarted) {
      return (
          <div className="h-full bg-gradient-to-br from-red-600 to-blue-600 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-6xl font-black mb-8 drop-shadow-lg tracking-tighter">UNO</h1>
              <button 
                onClick={startGame}
                className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-2xl shadow-xl hover:scale-105 transition-transform flex items-center gap-3"
              >
                  <Play size={28} /> Start Game
              </button>
          </div>
      );
  }

  return (
    <div className="h-full bg-[#1e3a8a] relative flex flex-col justify-between p-4 overflow-hidden select-none">
        
        {/* Top: Opponent 2 (Center) */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
             <div className={`p-2 rounded-full border-4 ${turn === 2 ? 'border-yellow-400 animate-pulse' : 'border-gray-300'} bg-white text-black`}>
                 <Bot size={24} />
             </div>
             <div className="mt-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{players[2].length} cards</div>
             <div className="flex -space-x-8 mt-2 scale-75 origin-top">
                 {players[2].map((c, i) => <div key={i}>{renderCard(c, false, true)}</div>)}
             </div>
        </div>

        {/* Left: Opponent 1 */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col items-center">
             <div className={`p-2 rounded-full border-4 ${turn === 1 ? 'border-yellow-400 animate-pulse' : 'border-gray-300'} bg-white text-black`}>
                 <Bot size={24} />
             </div>
             <span className="text-white font-bold my-1">Bot 1</span>
             <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full mb-2">{players[1].length} cards</div>
             {/* Stacked Cards Verticalish */}
             <div className="flex flex-col -space-y-12 scale-75">
                 {players[1].map((c, i) => <div key={i} className="transform -rotate-90">{renderCard(c, false, true)}</div>)}
             </div>
        </div>

        {/* Right: Opponent 3 */}
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center">
             <div className={`p-2 rounded-full border-4 ${turn === 3 ? 'border-yellow-400 animate-pulse' : 'border-gray-300'} bg-white text-black`}>
                 <Bot size={24} />
             </div>
             <span className="text-white font-bold my-1">Bot 3</span>
             <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full mb-2">{players[3].length} cards</div>
             <div className="flex flex-col -space-y-12 scale-75">
                 {players[3].map((c, i) => <div key={i} className="transform rotate-90">{renderCard(c, false, true)}</div>)}
             </div>
        </div>

        {/* Center: Table */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            {/* Color Indicator */}
            <div 
                className={`w-32 h-32 rounded-full absolute -z-10 blur-2xl opacity-60 transition-colors duration-500`}
                style={{ backgroundColor: currentColor === 'black' ? 'white' : currentColor === 'yellow' ? '#facc15' : currentColor === 'red' ? '#ef4444' : currentColor === 'blue' ? '#3b82f6' : '#22c55e' }}
            ></div>

            <div className="flex gap-8 items-center">
                {/* Draw Pile */}
                <div onClick={handleDrawClick} className="cursor-pointer transition-transform active:scale-95">
                    {renderCard({ id: 'deck', color: 'black', type: 'number', value: 0 }, false, true)}
                </div>
                
                {/* Discard Pile */}
                <div className="transform rotate-6">
                    {discardPile.length > 0 && renderCard(discardPile[discardPile.length-1])}
                </div>
            </div>

            <div className="mt-8 bg-black/60 backdrop-blur text-white px-4 py-2 rounded-full font-bold text-sm animate-bounce">
                {log}
            </div>

            {choosingColor && (
                <div className="absolute -top-32 bg-white p-2 rounded-xl shadow-2xl grid grid-cols-2 gap-2 animate-in zoom-in">
                    {COLORS.map(c => (
                        <button 
                            key={c} 
                            onClick={() => handleColorPick(c)}
                            className={`w-12 h-12 rounded-full ${c === 'red' ? 'bg-red-500' : c === 'blue' ? 'bg-blue-500' : c === 'green' ? 'bg-green-500' : 'bg-yellow-400'} border-2 border-gray-200 hover:scale-110 transition-transform`}
                        />
                    ))}
                </div>
            )}
        </div>

        {/* Bottom: Player Hand */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
             <div className="mb-2 flex items-center gap-2">
                 <div className={`p-1 rounded-full border-4 ${turn === 0 ? 'border-yellow-400 animate-pulse' : 'border-transparent'} transition-colors`}>
                     <User className="text-white" size={24} />
                 </div>
                 <span className="text-white font-bold text-shadow">{t.yourTurn}</span>
             </div>
             
             <div className="flex -space-x-8 hover:-space-x-4 transition-all overflow-x-auto p-4 max-w-full">
                 {players[0].map((c) => (
                     <div key={c.id} className="transition-all hover:-translate-y-6">
                         {renderCard(c, turn === 0)}
                     </div>
                 ))}
             </div>
        </div>

        {/* Winner Overlay */}
        {winner !== null && (
            <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center animate-fadeIn">
                 <h1 className="text-5xl font-bold text-yellow-400 mb-4">{winner === 0 ? 'YOU WIN!' : `BOT ${winner} WINS!`}</h1>
                 <button onClick={startGame} className="bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-110 transition-transform flex items-center gap-2">
                     <RotateCcw /> Play Again
                 </button>
            </div>
        )}
    </div>
  );
};