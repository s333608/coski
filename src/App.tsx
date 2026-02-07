import { GameProvider, useGame } from './context/GameContext';
import { MainMenu } from './components/MainMenu';
import { ModeSelect } from './components/ModeSelect';
import { MixingInterface } from './components/MixingInterface';
import { BossEvaluation } from './components/BossEvaluation';
import { Encyclopedia } from './components/Encyclopedia';
import { PlayerProgress } from './components/PlayerProgress';

function GameRouter() {
  const { currentScreen, isLoading } = useGame();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Mixology Master...</p>
        </div>
      </div>
    );
  }

  switch (currentScreen) {
    case 'menu':
      return <MainMenu />;
    case 'mode-select':
      return <ModeSelect />;
    case 'mixing':
      return <MixingInterface />;
    case 'evaluation':
      return <BossEvaluation />;
    case 'encyclopedia':
      return <Encyclopedia />;
    case 'progress':
      return <PlayerProgress />;
    default:
      return <MainMenu />;
  }
}

function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}

export default App;
