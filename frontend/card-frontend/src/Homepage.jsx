// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// const Homepage = () => {
//   const [newCard,setNewCard] = useState([])
//   useEffect(() =>{
//     const fetchAllCards = async ()=>{
//       try{
//         const res = await axios.get("http://localhost:8800")
//         setNewCard(res.data);
//       }catch(err){
//         console.log(err)
//       }
//     }
//     fetchAllCards()
//   },[])

//   return (
//     <div>
//       <h1>
//       {newCard.map(card=>(
//         <div key={card.id}>

//           <h2>{card.question}</h2>
//           <h2>{card.answer}</h2>

//         </div>
//       )) }

//       </h1>
//     </div>
//   )
// }

// export default Homepage

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Homepage.css"; // Make sure to create this CSS file with the styles provided earlier

const Homepage = () => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCards = async () => {
      try {
        const res = await axios.get("http://localhost:8800");
        setCards(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCards();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
    setIsFlipped(false);
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleDotClick = (index) => {
    setCurrentCardIndex(index);
    setIsFlipped(false);
  };

  if (cards.length === 0) {
    return (
      <div>
        <h2>Loading , add card</h2>
        <button onClick={handleDashboardClick}>dashboard</button>
      </div>
    );
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="card">
      <h1>Flashcards</h1>

      <div className={`card-inner ${isFlipped ? "is-flipped" : ""}`}>
        <div className="card-front">
          <h2>{currentCard.question}</h2>
          <button className="flip-button" onClick={handleFlip}>
            Show Answer
          </button>
        </div>
        <div className="card-back">
          <h2>{currentCard.answer}</h2>
          <button className="flip-button" onClick={handleFlip}>
            Show Question
          </button>
        </div>
      </div>

      <div className="card-navigation">
        <button onClick={handlePrevious} className="nav-button prev">
          Previous
        </button>
        <button className="nav-button next" onClick={handleNext}>
          Next
        </button>
      </div>

      <button className="dashboard-button" onClick={handleDashboardClick}>
        Go to Dashboard
      </button>

      <div className="progress-dots">
        {cards.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentCardIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
