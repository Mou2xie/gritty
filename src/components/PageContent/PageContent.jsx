import { WordsBook } from "../WordsBook/wordsBook";
import { SetUp } from "../SetUp/SetUp";
import { LogInContext } from "../../lib/contexts";

const PageContent = ({ choosenItem, isLogIn }) => {

    switch (choosenItem) {
        case 0: {
            return (
                <LogInContext.Provider value={isLogIn}>
                    <WordsBook></WordsBook>
                </LogInContext.Provider>
            );
        }
        case 1: {
            return (
                <div>温故知新</div>
            )
        }
        case 2: {
            return (
                <div>英文网站</div>
            )
        }
        case 3: {
            return (
                <div>移动端</div>
            )
        }
        case 4: {
            return (
                <LogInContext.Provider value={isLogIn}>
                    <SetUp></SetUp>
                </LogInContext.Provider>
            )
        }
        default: { }
    }

}

export { PageContent }