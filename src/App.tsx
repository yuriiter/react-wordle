import { ToastProvider } from "./components/Toast";
import { GameStateProvider } from "./store";
import { Container } from "@/components/Container";

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
