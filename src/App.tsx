import { ToastProvider } from "./components/Toast/Toast";
import { GameStateProvider } from "./store/GameState";
import { Container } from "lucide-react";

function App() {
  return (
    <GameStateProvider>
      <ToastProvider>
        <Container />
      </ToastProvider>
    </GameStateProvider>
  );
}

export default App;
