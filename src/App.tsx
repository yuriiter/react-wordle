import Dialog from "./components/Dialog/Dialog";
import { Wordle } from "./components/Wordle/Wordle";

function App() {
  return (
    <>
      <Wordle />
      <Dialog defaultOpen>Hello</Dialog>
    </>
  );
}

export default App;
