import { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/chessboard.css'; 
import { FaChessRook, FaChessKnight, FaChessBishop, FaChessQueen, FaChessKing, FaChessPawn } from 'react-icons/fa';
import { FaRegChessRook, FaRegChessKnight, FaRegChessBishop, FaRegChessQueen, FaRegChessKing, FaRegChessPawn } from 'react-icons/fa6';


const Chess = () => { 
    const initial = [ 
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], 
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], 
        ['', '', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', '', ''], 
        ['', '', '', '', '', '', '', ''], 
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], 
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'] 
    ]; 

    const [board, setBoard] = useState(initial); 
    const [dragpiece, setdragpiece] = useState(null); 
    const [dragpos, setdragpos] = useState(null); 

    const handledrags = (piece, row, col) => { 
        setdragpiece(piece); 
        setdragpos({ row, col }); 
    }; 

    const handledrop = (row, col) => { 
        const newBoard = board.map(r => r.slice()); 
        newBoard[dragpos.row][dragpos.col] = ''; 
        newBoard[row][col] = dragpiece; 
        setBoard(newBoard); 
        setdragpiece(null); 
        setdragpos(null); 
    }; 

    const renders = (piece) => { 
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
                                onDrop={() => handledrop(i, j)} 
                            > 
                                {piece && ( 
                                    <span 
                                        draggable 
                                        onDragStart={() => handledrags(piece, i, j)} 
                                        className="draggable" 
                                    > 
                                        {renders(piece)} 
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
