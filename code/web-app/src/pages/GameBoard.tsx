import React, { useState, useEffect } from "react";
import styles from "./GameBoard.module.css";

type Coordinate = { x: number; y: number };
type GameBoardProps = {
  size: number;
  coordinates: Coordinate[];
};

const GameBoard: React.FC<GameBoardProps> = ({ size, coordinates }) => {
  const [activeBlock, setActiveBlock] = useState<Coordinate | null>(null);
  const [userSelections, setUserSelections] = useState<Coordinate[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [modalMessage, setModalMessage] = useState<string>(
    "Memorize the blocks"
  );
  const [showModal, setShowModal] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(10);

  useEffect(() => {
    // Modal before starting the game
    const modalTimeout = setTimeout(() => {
      setShowModal(false);
      showBlocks();
    }, 5000);
    return () => clearTimeout(modalTimeout);
  }, []);

  const showBlocks = () => {
    let index = 0;
    const intervalId = setInterval(() => {
      setActiveBlock(coordinates[index]);
      index++;
      if (index === coordinates.length) {
        clearInterval(intervalId);
        // After all blocks shown, clear board and prompt user to select
        setTimeout(() => {
          setActiveBlock(null);
          setModalMessage("Your turn to click where the blocks appeared");
          setShowModal(true);
          // After the modal, start the timer for user to click
          setTimeout(() => {
            setShowModal(false);
            setTimer(10); // Resetting timer
            const countdown = setInterval(() => {
              setTimer((prevTimer) => {
                if (prevTimer === 1) {
                  clearInterval(countdown);
                  setShowResults(true);
                  setModalMessage("Let's check your score");
                  setShowModal(true);
                  calculateScore();
                  setTimeout(() => {
                    setShowModal(false);
                  }, 5000);
                }
                return prevTimer - 1;
              });
            }, 1000);
          }, 5000);
        }, 1000);
      }
    }, 1000);
  };

  const calculateScore = () => {
    const hits = coordinates.filter((coord) =>
      userSelections.some((sel) => sel.x === coord.x && sel.y === coord.y)
    ).length;
    setScore(hits);
  };

  const handleBlockClick = (x: number, y: number) => {
    if (!showResults && userSelections.length < coordinates.length) {
      setUserSelections([...userSelections, { x, y }]);
    }
  };

  return (
    <div className={styles.gameContainer}>
      {/* Overlay Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}

      {/* Game Board */}
      <div className={styles.gameBoard}>
        {Array.from({ length: size }, (_, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {Array.from({ length: size }, (_, colIndex) => (
              <div
                key={colIndex}
                className={`${styles.cell} ${
                  activeBlock &&
                  activeBlock.x === rowIndex &&
                  activeBlock.y === colIndex
                    ? styles.active
                    : ""
                } ${
                  showResults &&
                  coordinates.some(
                    (coord) => coord.x === rowIndex && coord.y === colIndex
                  )
                    ? userSelections.some(
                        (sel) => sel.x === rowIndex && sel.y === colIndex
                      )
                      ? styles.correct
                      : styles.missed
                    : ""
                } ${
                  showResults &&
                  !coordinates.some(
                    (coord) => coord.x === rowIndex && coord.y === colIndex
                  ) &&
                  userSelections.some(
                    (sel) => sel.x === rowIndex && sel.y === colIndex
                  )
                    ? styles.incorrect
                    : ""
                }`}
                onClick={() => handleBlockClick(rowIndex, colIndex)}
              >
                {showResults && (
                  <>
                    {coordinates.some(
                      (coord) => coord.x === rowIndex && coord.y === colIndex
                    ) && (
                      <span className={styles.symbol}>
                        {userSelections.some(
                          (sel) => sel.x === rowIndex && sel.y === colIndex
                        )
                          ? "✓"
                          : "✕"}
                      </span>
                    )}
                    {userSelections.some(
                      (sel) => sel.x === rowIndex && sel.y === colIndex
                    ) &&
                      !coordinates.some(
                        (coord) => coord.x === rowIndex && coord.y === colIndex
                      ) && <span className={styles.symbol}>✕</span>}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Timer and Score */}
      {!showResults && !showModal && (
        <div className={styles.timer}>Time remaining: {timer}</div>
      )}

      {showResults && !showModal && (
        <div className={styles.score}>
          Score: {score}/{coordinates.length}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
