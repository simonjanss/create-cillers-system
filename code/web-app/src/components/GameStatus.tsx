import React from "react";

interface GameStatusProps {
  isHost: boolean;
  gameName: string;
}

const GameStatus: React.FC<GameStatusProps> = ({ isHost, gameName }) => {
  if (!gameName) {
    return <div></div>;
  }

  const handleStartGame = async () => {
    alert("starting game");
  };

  if (!isHost)
    return (
      <div className="navbar bg-base-300 text-neutral-content">
        <div className="flex-1">
          <h1>{gameName}: Waiting for host...</h1>
        </div>
      </div>
    );

  return (
    <div className="navbar bg-base-300 text-neutral-content">
      <div className="flex-1">
        <h1>{gameName}: </h1>
        <button
          className="join-item btn btn-square btn-md btn-primary"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameStatus;
