import { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/chessboard.css'; 
import { FaChessRook, FaChessKnight, FaChessBishop, FaChessQueen, FaChessKing, FaChessPawn } from 'react-icons/fa';
import { FaRegChessRook, FaRegChessKnight, FaRegChessBishop, FaRegChessQueen, FaRegChessKing, FaRegChessPawn } from 'react-icons/fa6';


const Chess = () => { 
    const initialBoard = [ 
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], 
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], 
        ['', '', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', '', ''], 
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], 
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'] 
    ]; 

    const [board, setBoard] = useState(initialBoard); 
    const [draggedPiece, setDraggedPiece] = useState(null); 
    const [draggedPos, setDraggedPos] = useState(null); 

    const handleDragStart = (piece, row, col) => { 
        setDraggedPiece(piece); 
        setDraggedPos({ row, col }); 
    }; 

    const handleDrop = (row, col) => { 
        const newBoard = board.map(r => r.slice()); 
        newBoard[draggedPos.row][draggedPos.col] = ''; 
        newBoard[row][col] = draggedPiece; 
        setBoard(newBoard); 
        setDraggedPiece(null); 
        setDraggedPos(null); 
    }; 

    const renderPiece = (piece) => { 
        const icons = { 
            'r': <FaChessRook />, 'n': <FaChessKnight />, 'b': <FaChessBishop />, 'q': <FaChessQueen />, 'k': <FaChessKing />, 'p': <FaChessPawn />, 
            'R': <FaRegChessRook />, 'N': <FaRegChessKnight />, 'B': <FaRegChessBishop />, 'Q': <FaRegChessQueen />, 'K': <FaRegChessKing />, 'P': <FaRegChessPawn />
        }; 
        return icons[piece] || null; 
    }; 

    return ( 
        <div className="container d-flex justify-content-center align-items-center vh-100"> 
            <div className="board"> 
                {board.map((row, i) => 
                    row.map((piece, j) => { 
                        const isBlack = (i + j) % 2 === 1; 
                        return ( 
                            <div 
                                key={`${i}_${j}`} 
                                className={`square ${isBlack ? 'black' : 'white'}`} 
                                onDragOver={(e) => e.preventDefault()} 
                                onDrop={() => handleDrop(i, j)} 
                            > 
                                {piece && ( 
                                    <span 
                                        draggable 
                                        onDragStart={() => handleDragStart(piece, i, j)} 
                                        className="draggable" 
                                    > 
                                        {renderPiece(piece)} 
                                    </span> 
                                )} 
                            </div> 
                        ); 
                    }) 
                )} 
            </div> 
        </div> 
    ); 
}; 

export default Chess;
