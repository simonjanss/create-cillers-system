import React, { useState } from "react";

const Products: React.FC = () => {
  const [newGameText, setNewGameText] = useState("");

  const loading = false;
  const error = undefined;

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-300">
        <button className="btn">
          <span className="loading loading-spinner"></span>
          Loading...
        </button>
      </div>
    );
  if (error) return <p>{"Error: " + error}</p>;

  const handleCreateGame = async () => {
    if (!newGameText.trim()) return;

    // TODO: add query to create game
    // await addProduct({ variables: { name: newGameText } });
    alert("sim: Game created");
    setNewGameText(newGameText);
  };

  const handleJoinGame = async () => {
    if (!newGameText.trim()) return;

    // TODO: add query to join game
    // await addProduct({ variables: { name: newGameText } });
    alert("sim: Game joined");
    setNewGameText(newGameText);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="navbar bg-base-300 text-neutral-content">
        <div className="flex-1">
          <a href="/" className="p-2 normal-case text-xl">
            Game:
          </a>
          <input
            type="text"
            placeholder="Game name"
            className="join-item flex-grow input input-bordered input-md input-primary"
            value={newGameText}
            onChange={(e) => setNewGameText(e.target.value)}
          />
          <button
            className="join-item btn btn-square btn-md btn-primary"
            onClick={handleCreateGame}
          >
            Create
          </button>
          <button
            className="join-item btn btn-square btn-md btn-primary"
            onClick={handleJoinGame}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;