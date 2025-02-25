# Wordle Clone

This is a Wordle clone built with React, TypeScript, and Vite. It's designed to be played entirely with the keyboard.

## ✨ Features

- Keyboard-only gameplay
- Simple UI
- Toast notifications for feedback
- Game state management (starting, playing, win/lose)
- Instructions dialog
- Animations for feedback (shaking row, tile reveals)
- Option to reveal the word
- Reusable components (Dialog, Toast)
- Unit tested game logic

## 🚀 Getting Started

1. `git clone https://github.com/yuriiter/react-wordle.git`
2. `cd react-wordle`
3. `pnpm install`
4. `pnpm dev`

## 🎮 How to Play

Standard Wordle rules. Type a 5-letter word and press <kbd>Enter</kbd>. Green tile = correct letter and position. Yellow = correct letter, wrong position. Gray = incorrect letter. You have 5 tries.

## ⌨️ Keyboard Shortcuts

- <kbd>Shift + R</kbd>: Restart
- <kbd>Shift + W</kbd>: Reveal word
- <kbd>?</kbd>: Instructions
- <kbd>Enter</kbd>: Start/Submit
- <kbd>Backspace</kbd>: Delete letter

## 🧱 Project Structure

- **`src/components`:** UI components (Dialog, GameStatus, Toast, Wordle)
  - Wordle sub-components: Buttons, Captions, InstructionsDialog, Row
- **`src/gameLogic.ts`:** Core game logic
- **`src/hooks`:** Custom hooks (useAnimationClass, useEnter, useEventListener, useRandomItem)
- **`src/store`:** Global game state (Context/useReducer)
- **`src/utils.ts`:** Utility functions

## 🛠️ Main Hooks

- `useWordle`: Core game logic
- `useWordleReducer`: Game state updates
- `useKeyListeners`: Keyboard input
- `useGameState`: Access to global game state

## 📦 Main Components

- `Wordle`: Main game
- `GameStatus`: Game screens
- `Toast`: Notifications
- `Dialog`: Modal dialog
