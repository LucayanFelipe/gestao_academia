import { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './style.css';

const Dashboard = ({ user }) => {
  // Lista de alimentos com valores de proteína por 100g
  const foodOptions = [
    { name: 'Carne Bovina', proteinPer100g: 26 },
    { name: 'Frango', proteinPer100g: 27 },
    { name: 'Ovo', proteinPer100g: 13 },
    { name: 'Peixe', proteinPer100g: 22 },
    { name: 'Queijo Cottage', proteinPer100g: 11 },
  ];

  // Dias da semana
  const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  // Recupera os dados do localStorage ou define valores padrão
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
  const [selectedFood, setSelectedFood] = useState(foodOptions[0].name); // Estado para o alimento selecionado
  const [foodGrams, setFoodGrams] = useState(0); // Estado para os gramas informados pelo usuário
  const [isLocked, setIsLocked] = useState(false);
  const [proteinGoal, setProteinGoal] = useState(
    parseFloat(localStorage.getItem('proteinGoal')) || 100
  );

  // Recupera o dia e o treino do localStorage
  const [currentDay, setCurrentDay] = useState(
    parseInt(localStorage.getItem('currentDay')) || new Date().getDay()
  );
  const [currentWorkout, setCurrentWorkout] = useState(
    localStorage.getItem('currentWorkout') || ''
  );

  // Calcula as proteínas consumidas
  const consumedProtein = foods.reduce(
    (total, food) => total + parseFloat(food.protein),
    0
  );

  // Atualiza o localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('weight', weight);
    localStorage.setItem('height', height);
    localStorage.setItem('gender', gender);
    localStorage.setItem('foods', JSON.stringify(foods));
    localStorage.setItem('proteinGoal', proteinGoal);
    localStorage.setItem('currentDay', currentDay);
    localStorage.setItem('currentWorkout', currentWorkout);
  }, [weight, height, gender, foods, proteinGoal, currentDay, currentWorkout]);

  const calculateProteinGoal = () => {
    const base = gender === 'male' ? 1.6 : 1.4;
    const goal = (weight * base).toFixed(2);
    setProteinGoal(goal);
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const addFood = () => {
    if (selectedFood && foodGrams > 0) {
      // Encontra o alimento selecionado na lista de opções
      const selectedFoodData = foodOptions.find(
        (food) => food.name === selectedFood
      );

      // Calcula a quantidade de proteína com base nos gramas informados
      const protein = ((selectedFoodData.proteinPer100g * foodGrams) / 100).toFixed(2);

      // Adiciona o alimento à lista
      const newFood = { name: selectedFood, protein: parseFloat(protein), grams: foodGrams };
      setFoods([...foods, newFood]);

      // Limpa os campos
      setSelectedFood(foodOptions[0].name);
      setFoodGrams(0);
    }
  };

  const deleteFood = (index) => {
    const updatedFoods = foods.filter((_, i) => i !== index); // Remove o alimento no índice especificado
    setFoods(updatedFoods); // Atualiza o estado 
  };

  return (
    <div className="dashboard-container">
      <h2 className="title">BEM VINDO: {user.name}</h2>
      <p>Hoje é {daysOfWeek[currentDay]} um lindo dia para treinar</p>
      <p>Grupo muscular do dia a ser treinado: {currentWorkout}</p>
      <div className="protein-progress">
        <CircularProgressbar
          value={((consumedProtein / proteinGoal) * 100)}
          text={`${(consumedProtein).toFixed(2)}g`}
        />
        <p>Meta de proteínas diária: {proteinGoal}g</p>
      </div>
      <h1 className="nutricao">Consumo de proteínas diárias (g)</h1>
      <div className="food-itens">
        <select
          value={selectedFood}
          onChange={(e) => setSelectedFood(e.target.value)}
          disabled={isLocked}
        >
          {foodOptions.map((food, index) => (
            <option key={index} value={food.name}>
              {food.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Gramas (g)"
          value={foodGrams}
          onChange={(e) => setFoodGrams(e.target.value)}
          disabled={isLocked}
        />
        <button onClick={addFood} disabled={isLocked}>
          Adicionar
        </button>
      </div>
      <ul>
        {foods.map((food, index) => (
          <li key={index}>
            {food.name} - {food.grams}g → {food.protein}g de proteína
            <button onClick={() => deleteFood(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;