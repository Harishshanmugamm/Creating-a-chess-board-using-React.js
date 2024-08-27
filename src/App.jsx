import { useState } from 'react';
import { FaChessKing, FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight, FaChessPawn } from 'react-icons/fa';
// import './ChessBoard.css';  // Optional for styling
import "../css/chessboard.css"
const ChessBoard = () => {
  // Chess pieces initial positions
  const initialBoard = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"]
  ];

  // Store the board state
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState(null);

  // Function to render pieces using icons
  const renderPiece = (piece) => {
    switch (piece) {
      case 'r': return <FaChessRook />;
      case 'n': return <FaChessKnight />;
      case 'b': return <FaChessBishop />;
      case 'q': return <FaChessQueen />;
      case 'k': return <FaChessKing />;
      case 'p': return <FaChessPawn />;
      case 'R': return <FaChessRook style={{ color: 'white' }} />;
      case 'N': return <FaChessKnight style={{ color: 'white' }} />;
      case 'B': return <FaChessBishop style={{ color: 'white' }} />;
      case 'Q': return <FaChessQueen style={{ color: 'white' }} />;
      case 'K': return <FaChessKing style={{ color: 'white' }} />;
      case 'P': return <FaChessPawn style={{ color: 'white' }} />;
      default: return null;
    }
  };

  // Click handler for selecting and moving pieces
  const handleClick = (row, col) => {
    if (selected) {
      // Move the piece to the new position
      const newBoard = board.map((rowArr) => rowArr.slice());
      newBoard[row][col] = board[selected.row][selected.col];
      newBoard[selected.row][selected.col] = null;
      setBoard(newBoard);
      setSelected(null);
    } else if (board[row][col]) {
      // Select a piece
      setSelected({ row, col });
    }
  };

  // Render the chessboard
  return (
    <div className="chessboard-container">
      <table className="chessboard">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const isSelected = selected && selected.row === rowIndex && selected.col === colIndex;
                const isBlackCell = (rowIndex + colIndex) % 2 === 1;
                return (
                  <td
                    key={colIndex}
                    className={`cell ${isBlackCell ? 'black-cell' : 'white-cell'} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleClick(rowIndex, colIndex)}
                  >
                    {renderPiece(cell)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChessBoard;
