import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Game from '@/components/Game';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type GameMode = 'survival' | 'creative' | null;
type Difficulty = 'peaceful' | 'easy' | 'normal' | 'hard' | 'nomobs';
type Screen = 'menu' | 'world-create' | 'game' | 'settings';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('menu');
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [worldSeed, setWorldSeed] = useState<number>(Math.floor(Math.random() * 10000));
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  if (screen === 'game' && gameMode) {
    return (
      <Game 
        mode={gameMode} 
        difficulty={difficulty}
        worldSeed={worldSeed}
        isMultiplayer={isMultiplayer}
        onExit={() => {
          setScreen('menu');
          setGameMode(null);
        }} 
      />
    );
  }

  if (screen === 'world-create') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card p-12 rounded border-4 border-border shadow-2xl max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-card-foreground mb-8 text-center" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            СОЗДАТЬ МИР
          </h1>
          
          <div className="space-y-6 mb-8">
            <div>
              <Label className="text-card-foreground mb-2 block" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
                Режим игры
              </Label>
              <div className="space-y-2">
                <Button
                  onClick={() => setGameMode('survival')}
                  className={`w-full ${gameMode === 'survival' ? 'bg-primary' : 'bg-muted'} text-white font-bold py-4`}
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}
                >
                  {gameMode === 'survival' ? '✓ ' : ''}ВЫЖИВАНИЕ
                </Button>
                <Button
                  onClick={() => setGameMode('creative')}
                  className={`w-full ${gameMode === 'creative' ? 'bg-primary' : 'bg-muted'} text-white font-bold py-4`}
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}
                >
                  {gameMode === 'creative' ? '✓ ' : ''}КРЕАТИВ
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-card-foreground mb-2 block" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
                Сложность
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => setDifficulty('peaceful')}
                  className={`${difficulty === 'peaceful' ? 'bg-primary' : 'bg-muted'} text-white font-bold py-3`}
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
                >
                  {difficulty === 'peaceful' ? '✓ ' : ''}Мирный
                </Button>
                <Button
                  onClick={() => setDifficulty('easy')}
                  className={`${difficulty === 'easy' ? 'bg-primary' : 'bg-muted'} text-white font-bold py-3`}
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
                >
                  {difficulty === 'easy' ? '✓ ' : ''}Лёгкий
                </Button>
                <Button
                  onClick={() => setDifficulty('normal')}
                  className={`${difficulty === 'normal' ? 'bg-primary' : 'bg-muted'} text-white font-bold py-3`}
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
                >
                  {difficulty === 'normal' ? '✓ ' : ''}Средний
                </Button>
                <Button
                  onClick={() => setDifficulty('hard')}
                  className={`${difficulty === 'hard' ? 'bg-primary' : 'bg-muted'} text-white font-bold py-3`}
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
                >
                  {difficulty === 'hard' ? '✓ ' : ''}Сложный
                </Button>
                <Button
                  onClick={() => setDifficulty('nomobs')}
                  className={`${difficulty === 'nomobs' ? 'bg-primary' : 'bg-muted'} text-white font-bold py-3 col-span-2`}
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
                >
                  {difficulty === 'nomobs' ? '✓ ' : ''}Без мобов
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-card-foreground mb-2 block" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
                Мультиплеер (с ботами)
              </Label>
              <Button
                onClick={() => setIsMultiplayer(!isMultiplayer)}
                className={`w-full ${isMultiplayer ? 'bg-primary' : 'bg-muted'} text-white font-bold py-4`}
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}
              >
                {isMultiplayer ? '✓ ВКЛЮЧЕН' : 'ВЫКЛЮЧЕН'}
              </Button>
            </div>

            <div>
              <Label className="text-card-foreground mb-2 block" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
                Seed мира
              </Label>
              <Input
                type="number"
                value={worldSeed}
                onChange={(e) => setWorldSeed(parseInt(e.target.value) || 0)}
                className="bg-input text-foreground border-border"
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => {
                if (gameMode) {
                  setScreen('game');
                }
              }}
              disabled={!gameMode}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              НАЧАТЬ ИГРУ
            </Button>
            <Button 
              onClick={() => setScreen('menu')}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              НАЗАД
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'settings') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card p-12 rounded border-4 border-border shadow-2xl max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-card-foreground mb-8 text-center" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            НАСТРОЙКИ
          </h1>
          <div className="space-y-4 mb-8">
            <div className="text-card-foreground" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '14px' }}>
              <p className="mb-2">Музыка: ВКЛ</p>
              <p className="mb-2">Звук: ВКЛ</p>
              <p className="mb-2">Графика: СРЕДНЯЯ</p>
            </div>
          </div>
          <Button 
            onClick={() => setScreen('menu')}
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            НАЗАД
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-card p-12 rounded border-4 border-border shadow-2xl max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-card-foreground mb-12 text-center" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          MINECRAFT
        </h1>
        
        <div className="space-y-4">
          <Button 
            onClick={() => {
              setGameMode('survival');
              setDifficulty('normal');
              setIsMultiplayer(false);
              setWorldSeed(Math.floor(Math.random() * 10000));
              setScreen('game');
            }}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            ИГРАТЬ
          </Button>
          
          <Button 
            onClick={() => setScreen('world-create')}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            СОЗДАТЬ МИР
          </Button>
          
          <Button 
            onClick={() => {
              setGameMode('creative');
              setDifficulty('peaceful');
              setIsMultiplayer(false);
              setWorldSeed(Math.floor(Math.random() * 10000));
              setScreen('game');
            }}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            КРЕАТИВ
          </Button>
          
          <Button 
            onClick={() => {
              setGameMode('survival');
              setDifficulty('normal');
              setIsMultiplayer(true);
              setWorldSeed(Math.floor(Math.random() * 10000));
              setScreen('game');
            }}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            МУЛЬТИПЛЕЕР
          </Button>
          
          <Button 
            onClick={() => setScreen('settings')}
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-6 text-lg"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            НАСТРОЙКИ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
