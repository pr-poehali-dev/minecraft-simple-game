import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Game from '@/components/Game';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  if (gameStarted) {
    return <Game onExit={() => setGameStarted(false)} />;
  }

  if (showSettings) {
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
            onClick={() => setShowSettings(false)}
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
            onClick={() => setGameStarted(true)}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            ИГРАТЬ
          </Button>
          
          <Button 
            onClick={() => setShowSettings(true)}
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-6 text-lg"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            НАСТРОЙКИ
          </Button>
          
          <Button 
            disabled
            className="w-full bg-muted text-muted-foreground font-bold py-6 text-lg cursor-not-allowed opacity-50"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            ОДИНОЧНЫЙ МИР
          </Button>
          
          <Button 
            disabled
            className="w-full bg-muted text-muted-foreground font-bold py-6 text-lg cursor-not-allowed opacity-50"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            КРЕАТИВ
          </Button>
          
          <Button 
            disabled
            className="w-full bg-muted text-muted-foreground font-bold py-6 text-lg cursor-not-allowed opacity-50"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            МУЛЬТИПЛЕЕР
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;