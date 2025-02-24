import { GAME_STATUS } from "@/constants";
import {
  createContext,
  useReducer,
  PropsWithChildren,
  Dispatch,
  useContext,
} from "react";

export interface IGameState {
  gameStatus: GAME_STATUS;
}

type GameAction = { type: "SET_STATUS"; payload: GAME_STATUS };

const initialGameState: IGameState = {
  gameStatus: GAME_STATUS.STARTING,
};

const gameReducer = (state: IGameState, action: GameAction): IGameState => {
  switch (action.type) {
    case "SET_STATUS":
      return { ...state, gameStatus: action.payload };
    default:
      return state;
  }
};

interface IGameContext {
  state: IGameState;
  dispatch: Dispatch<GameAction>;
}

export const GameStateContext = createContext<IGameContext | undefined>(
  undefined,
);

export const GameStateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const gameContext = useContext(GameStateContext);

  if (!gameContext) {
    throw new Error("GameComponent must be used within a GameStateProvider");
  }

  return gameContext;
};
