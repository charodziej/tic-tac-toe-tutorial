import React from 'react'
import Board from './Board'
import calculateWinner from './utils'

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [ {
                squares: Array(9).fill(null)
            } ],
            stepNumber: 0,
            xIsNext: false
        }
    }

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const squares = Array.from(history[history.length - 1].squares)

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'A' : 'B'
        this.setState({ 
            history: [ ...history, { squares } ],
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo = (stepNumber) => {
        this.setState({
            stepNumber,
            xIsNext: (stepNumber % 2) === 1,
        })
    }

    render() {
        const { history } = this.state
        const { squares } = history[this.state.stepNumber]
        const winner = calculateWinner(squares)

        const moves = history.map((step, move) => {
            const description = move ?
                "Go to move " + move :
                "Go to the start of the game"
            
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{description}</button>
                </li>
            )
        })

        const names = {
            "A": "charodziej",
            "B": "something random"
        }

        let status
        if (winner) {
            status = names[winner] + ' is the Champion!'
        } else {
            if (this.state.stepNumber < 9) {
                status = 'Next player: ' + names[(this.state.xIsNext ? 'A' : 'B')]
            } else {
                status = 'Draw!'
            }
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={squares}
                        onClick={this.handleClick}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
