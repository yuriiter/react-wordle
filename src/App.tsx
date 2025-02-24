import { Dialog } from "./components/Dialog/Dialog";
import { ToastProvider } from "./components/Toast/Toast";
import { Wordle } from "./components/Wordle/Wordle";

function App() {
  return (
    <>
      <ToastProvider>
        <Wordle />
        <Dialog defaultOpen>Hello</Dialog>
      </ToastProvider>
    </>
  );
}

export default App;
