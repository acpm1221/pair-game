import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [gridSize, setGridSize] = useState({ groupSize: 2, itemCount: 8, columns: 4 });
  const [wordPairs, setWordPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);

  const words = [
    { word: 'Apple', group: 'Fruit' },
    { word: 'Banana', group: 'Fruit' },
    { word: 'Carrot', group: 'Vegetable' },
    { word: 'Lettuce', group: 'Vegetable' },
    { word: 'Dog', group: 'Animal' },
    { word: 'Cat', group: 'Animal' },
    { word: 'Jupiter', group: 'Planet' },
    { word: 'Mars', group: 'Planet' },
  ];

  useEffect(() => {
    const shuffledWords = [...words];
    const pairs = shuffledWords.slice(0, gridSize.itemCount / 2);
    const randomPairs = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
    setWordPairs(randomPairs);
  }, [gridSize]);

  const handleTileClick = (index, word) => {
    if (selectedTiles.length < 2 && !matchedTiles.some((tile) => tile.index === index)) {
      setSelectedTiles((prev) => [...prev, { index, word }]);
    }
  };

  useEffect(() => {
    if (selectedTiles.length === 2) {
      const [tile1, tile2] = selectedTiles;
      if (tile1.word === tile2.word) {
        setMatchedTiles((prev) => [...prev, tile1, tile2]);
        setAttempts((prev) => prev + 1);
      } else {
        setAttempts((prev) => prev + 1);
      }
      setTimeout(() => setSelectedTiles([]), 1000);
    }
  }, [selectedTiles]);

  const handleReset = () => {
    setAttempts(0);
    setMatchedTiles([]);
    setSelectedTiles([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGridSize((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="App">
      <h1>Word Connect Game</h1>
      <div className="config-panel">
        <h2>Game Settings</h2>
        <label>
          Group Size:
          <input
            type="number"
            name="groupSize"
            value={gridSize.groupSize}
            onChange={handleInputChange}
            min="2"
            max="4"
          />
        </label>
        <label>
          Item Count:
          <input
            type="number"
            name="itemCount"
            value={gridSize.itemCount}
            onChange={handleInputChange}
            min="8"
            max="16"
          />
        </label>
        <label>
          Number of Columns:
          <input
            type="number"
            name="columns"
            value={gridSize.columns}
            onChange={handleInputChange}
            min="2"
            max="6"
          />
        </label>
      </div>
      <div className="attempts">Attempts: {attempts}</div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize.columns}, 1fr)` }}>
        {wordPairs.map((pair, index) => (
          <div
            key={index}
            className={`word-tile ${matchedTiles.some((tile) => tile.index === index) ? 'matched' : ''} 
                        ${selectedTiles.some((tile) => tile.index === index) ? 'selected' : ''}`}
            onClick={() => handleTileClick(index, pair.word)}
          >
            {(matchedTiles.some((tile) => tile.index === index) || selectedTiles.some((tile) => tile.index === index))
              ? pair.word
              : '????'}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
