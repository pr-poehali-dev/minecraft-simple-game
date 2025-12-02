import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type BlockType = 'grass' | 'dirt' | 'stone' | 'wood' | 'air';

interface Block {
  type: BlockType;
  x: number;
  y: number;
}

interface InventoryItem {
  type: BlockType;
  count: number;
}

interface CraftRecipe {
  result: BlockType;
  ingredients: { type: BlockType; count: number }[];
  name: string;
}

const CRAFT_RECIPES: CraftRecipe[] = [
  {
    result: 'wood',
    ingredients: [{ type: 'grass', count: 2 }],
    name: 'Доски'
  },
  {
    result: 'stone',
    ingredients: [{ type: 'dirt', count: 3 }],
    name: 'Камень'
  }
];

const BLOCK_COLORS: Record<BlockType, string> = {
  grass: '#228B22',
  dirt: '#8B4513',
  stone: '#808080',
  wood: '#D2691E',
  air: 'transparent'
};

const BLOCK_NAMES: Record<BlockType, string> = {
  grass: 'Трава',
  dirt: 'Земля',
  stone: 'Камень',
  wood: 'Доски',
  air: 'Воздух'
};

const Game = ({ mode, onExit }: { mode: 'survival' | 'creative'; onExit: () => void }) => {
  const [world, setWorld] = useState<Block[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>(
    mode === 'survival' 
      ? [] 
      : [
          { type: 'grass', count: 999 },
          { type: 'dirt', count: 999 },
          { type: 'stone', count: 999 },
          { type: 'wood', count: 999 }
        ]
  );
  const [health, setHealth] = useState(20);
  const [hunger, setHunger] = useState(20);
  const [showInventory, setShowInventory] = useState(false);
  const [showCraft, setShowCraft] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<BlockType>('grass');

  useEffect(() => {
    const initialWorld: Block[] = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 16; x++) {
        if (y > 6) {
          initialWorld.push({ type: 'grass', x, y });
        } else if (y > 4) {
          initialWorld.push({ type: 'dirt', x, y });
        } else {
          initialWorld.push({ type: 'air', x, y });
        }
      }
    }
    setWorld(initialWorld);
  }, []);

  const handleBlockClick = useCallback((x: number, y: number) => {
    setWorld(prev => {
      const blockIndex = prev.findIndex(b => b.x === x && b.y === y);
      if (blockIndex === -1) return prev;
      
      const block = prev[blockIndex];
      const newWorld = [...prev];
      
      if (block.type !== 'air') {
        setInventory(inv => {
          const itemIndex = inv.findIndex(i => i.type === block.type);
          if (itemIndex >= 0) {
            const newInv = [...inv];
            newInv[itemIndex].count += 1;
            return newInv;
          } else {
            return [...inv, { type: block.type, count: 1 }];
          }
        });
        newWorld[blockIndex] = { ...block, type: 'air' };
      } else {
        const invItem = inventory.find(i => i.type === selectedBlock);
        if (invItem && invItem.count > 0) {
          newWorld[blockIndex] = { ...block, type: selectedBlock };
          setInventory(inv => {
            const newInv = [...inv];
            const idx = newInv.findIndex(i => i.type === selectedBlock);
            if (idx >= 0) {
              newInv[idx].count -= 1;
              if (newInv[idx].count === 0) {
                newInv.splice(idx, 1);
              }
            }
            return newInv;
          });
        }
      }
      
      return newWorld;
    });
  }, [selectedBlock, inventory]);

  const craftItem = (recipe: CraftRecipe) => {
    const canCraft = recipe.ingredients.every(ing => {
      const invItem = inventory.find(i => i.type === ing.type);
      return invItem && invItem.count >= ing.count;
    });

    if (!canCraft) return;

    setInventory(prev => {
      const newInv = [...prev];
      
      recipe.ingredients.forEach(ing => {
        const idx = newInv.findIndex(i => i.type === ing.type);
        if (idx >= 0) {
          newInv[idx].count -= ing.count;
          if (newInv[idx].count === 0) {
            newInv.splice(idx, 1);
          }
        }
      });

      const resultIdx = newInv.findIndex(i => i.type === recipe.result);
      if (resultIdx >= 0) {
        newInv[resultIdx].count += 1;
      } else {
        newInv.push({ type: recipe.result, count: 1 });
      }

      return newInv;
    });
  };

  return (
    <div className="min-h-screen bg-accent relative overflow-hidden">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <Button
            onClick={onExit}
            className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
          >
            ВЫХОД
          </Button>
          
          {mode === 'survival' && (
            <div className="flex gap-3 bg-card/90 px-4 py-2 rounded border-2 border-border">
              <div className="flex items-center gap-2">
                <Icon name="Heart" size={16} className="text-red-500" />
                <span 
                  className="text-card-foreground font-bold"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
                >
                  {health}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Drumstick" size={16} className="text-orange-500" />
                <span 
                  className="text-card-foreground font-bold"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
                >
                  {hunger}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setShowInventory(!showInventory);
              setShowCraft(false);
            }}
            className="bg-card hover:bg-card/90 text-card-foreground px-4 py-2"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
          >
            <Icon name="Package" size={16} className="mr-2" />
            E
          </Button>
          
          <Button
            onClick={() => {
              setShowCraft(!showCraft);
              setShowInventory(false);
            }}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
          >
            <Icon name="Hammer" size={16} className="mr-2" />
            C
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="grid gap-0 border-4 border-black"
          style={{ 
            gridTemplateColumns: 'repeat(16, 40px)',
            gridTemplateRows: 'repeat(10, 40px)',
            imageRendering: 'pixelated'
          }}
        >
          {world.map((block, idx) => (
            <div
              key={idx}
              onClick={() => handleBlockClick(block.x, block.y)}
              className="border border-black/20 cursor-pointer hover:brightness-110 transition-all"
              style={{
                backgroundColor: BLOCK_COLORS[block.type],
                width: '40px',
                height: '40px',
                imageRendering: 'pixelated'
              }}
            />
          ))}
        </div>
      </div>

      {showInventory && (
        <div className="absolute top-20 right-4 bg-card border-4 border-border p-4 rounded shadow-2xl max-w-xs">
          <h2 
            className="text-card-foreground mb-4 text-center"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}
          >
            ИНВЕНТАРЬ
          </h2>
          <div className="space-y-2">
            {inventory.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedBlock(item.type)}
                className={`flex items-center justify-between p-2 rounded cursor-pointer border-2 ${
                  selectedBlock === item.type ? 'border-primary bg-primary/20' : 'border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 border-2 border-black"
                    style={{ 
                      backgroundColor: BLOCK_COLORS[item.type],
                      imageRendering: 'pixelated'
                    }}
                  />
                  <span 
                    className="text-card-foreground"
                    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
                  >
                    {BLOCK_NAMES[item.type]}
                  </span>
                </div>
                <span 
                  className="text-card-foreground font-bold"
                  style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
                >
                  x{item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showCraft && (
        <div className="absolute top-20 right-4 bg-card border-4 border-border p-4 rounded shadow-2xl max-w-sm">
          <h2 
            className="text-card-foreground mb-4 text-center"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}
          >
            КРАФТ
          </h2>
          <div className="space-y-3">
            {CRAFT_RECIPES.map((recipe, idx) => {
              const canCraft = recipe.ingredients.every(ing => {
                const invItem = inventory.find(i => i.type === ing.type);
                return invItem && invItem.count >= ing.count;
              });

              return (
                <div
                  key={idx}
                  className={`border-2 p-3 rounded ${
                    canCraft ? 'border-primary bg-primary/10' : 'border-muted bg-muted/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="text-card-foreground"
                      style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '9px' }}
                    >
                      {recipe.name}
                    </span>
                    <div
                      className="w-6 h-6 border-2 border-black"
                      style={{ 
                        backgroundColor: BLOCK_COLORS[recipe.result],
                        imageRendering: 'pixelated'
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mb-2" style={{ fontSize: '8px' }}>
                    {recipe.ingredients.map((ing, i) => (
                      <span key={i}>
                        {BLOCK_NAMES[ing.type]} x{ing.count}
                        {i < recipe.ingredients.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                  <Button
                    onClick={() => craftItem(recipe)}
                    disabled={!canCraft}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-1"
                    style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}
                  >
                    СОЗДАТЬ
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/90 px-6 py-3 rounded border-2 border-border">
        <div className="flex items-center gap-4">
          <p 
            className="text-card-foreground text-center"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '9px' }}
          >
            ВЫБРАНО: {BLOCK_NAMES[selectedBlock]}
          </p>
          <span 
            className="text-muted-foreground"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}
          >
            РЕЖИМ: {mode === 'survival' ? 'ВЫЖИВАНИЕ' : 'КРЕАТИВ'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Game;