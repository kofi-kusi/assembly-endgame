import { getFarewellText } from "../utils"

export default function Notice(props) {
    // console.log(getFarewellText(props.language))
    return (
        <>
        <section className="notice">
            {!props.isGameOver && props.isLastGuessedIncorrect && (
                <div className="farewell-notice">
            <p>{getFarewellText(props.language.name)}</p>
            </div>)
            }
            {props.isGameWon && (
                <div className="won-notice">
            <h2>You Win!</h2>
            <p>Well done! 🎉</p>
            </div>)
            }
            {props.isGameLost && (
                <div className="lost-notice">
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
            </div>)
            }
        </section>
        </>
    )
}