import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Nutrition = () => {
  const navigate = useNavigate();

  const [weight, setWeight] = useState(
    parseFloat(localStorage.getItem('weight')) || 0
  );
  const [height, setHeight] = useState(
    parseFloat(localStorage.getItem('height')) || 0
  );
  const [gender, setGender] = useState(
    localStorage.getItem('gender') || 'male'
  );
  const [foods, setFoods] = useState(
    JSON.parse(localStorage.getItem('foods')) || []
  );
  const [isLocked, setIsLocked] = useState(false);
  const [proteinGoal, setProteinGoal] = useState(
    parseFloat(localStorage.getItem('proteinGoal')) || 100
  );

  useEffect(() => {
    localStorage.setItem('weight', weight);
    localStorage.setItem('height', height);
    localStorage.setItem('gender', gender);
    localStorage.setItem('foods', JSON.stringify(foods));
    localStorage.setItem('proteinGoal', proteinGoal);
  }, [weight, height, gender, foods, proteinGoal]);

  const calculateProteinGoal = () => {
    const base = gender === 'male' ? 1.6 : 1.4;
    const goal = (weight * base).toFixed(2);
    setProteinGoal(goal);
    alert('Meta de proteínas calculada com sucesso!');
    navigate('/dashboard');
  };

  return (
    <div className="nutrition-container">
      <h1>Informe seus dados</h1>
      <div className="input-group">
        <label>Peso (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          disabled={isLocked}
        />
        <label>Altura (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          disabled={isLocked}
        />
        <label>Sexo:</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          disabled={isLocked}
        >
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
        </select>
      </div>
      <div className="button-group">
        <button onClick={calculateProteinGoal} disabled={isLocked}>
          Calcular Meta de Proteínas
        </button>
      </div>
    </div>
  );
};

export default Nutrition;
