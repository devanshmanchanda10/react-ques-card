import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get("https://react-ques-card.onrender.com");
      setCards(res.data);
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting new card:", newCard); // Log the card being submitted
  
    try {
      if (editingCard) {
        await axios.put(`https://react-ques-card.onrender.com/dashboard/${editingCard.id}`, newCard);
      } else {
        await axios.post("https://react-ques-card.onrender.com/dashboard", newCard);
      }
      fetchCards();
      setNewCard({ question: '', answer: '' });
      setEditingCard(null);
    } catch (err) {
      console.error("Error submitting card:", err); // Log any errors
    }
  };
  

  const handleEdit = (card) => {
    setEditingCard(card);
    setNewCard({ question: card.question, answer: card.answer });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://react-ques-card.onrender.com/${id}`);
      fetchCards();
    } catch (err) {
      console.error("Error deleting card:", err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button className="dashboard-button" onClick={handleHomeClick}>Home</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          value={newCard.question}
          onChange={handleInputChange}
          placeholder="Question"
          required
        />
        <input
          type="text"
          name="answer"
          value={newCard.answer}
          onChange={handleInputChange}
          placeholder="Answer"
          required
        />
        <button type="submit">{editingCard ? 'Update' : 'Add'} Card</button>
      </form>
      <div>
        {cards.map(card => (
          <div key={card.id}>
            <h3>{card.question}</h3>
            <p>{card.answer}</p>
            <button onClick={() => handleEdit(card)}>Edit</button>
            <button onClick={() => handleDelete(card.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
