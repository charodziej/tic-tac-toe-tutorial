import React from 'react'
import Square from './Square'

export default function Board({ squares, onClick }) {
    return (
        <div>
            {[ ...Array(3) ].map((val, row) => (
                <div 
                    key={row}
                    className="board-row" 
                >
                    {[ ...Array(3) ].fill(null).map((val, column) => {
                        const index = 3 * row + column
                        return (
                            <Square 
                                key={column}
                                value={squares[index]} 
                                onClick={() => onClick(index)}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
