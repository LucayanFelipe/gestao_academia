import React, { useState, useEffect } from 'react';
import './style.css';

const WorkoutRoutine = () => {
  // Definição dos treinos
  const workouts = {
    SUPERIORES: {
      name: 'Superiores Completo',
      exercises: [
        {
          name: 'Supino Reto (Barra ou Halteres)',
          sets: 4,
          reps: '8-12',
          rest: '90 segundos',
        },
        {
          name: 'Puxada na Barra Fixa (ou Pulldown com Pegada Pronada)',
          sets: 4,
          reps: '8-12',
          rest: '90 segundos',
        },
        {
          name: 'Desenvolvimento de Ombros (Barra ou Halteres)',
          sets: 4,
          reps: '8-12',
          rest: '90 segundos',
        },
        {
          name: 'Remada Curvada (Barra ou Halteres)',
          sets: 4,
          reps: '8-12',
          rest: '90 segundos',
        },
        {
          name: 'Rosca Direta (Barra ou Halteres)',
          sets: 3,
          reps: '10-12',
          rest: '60 segundos',
        },
        {
          name: 'Tríceps na Polia Alta (ou Mergulho)',
          sets: 3,
          reps: '10-12',
          rest: '60 segundos',
        },
        {
          name: 'Encolhimento de Ombros (com Barra ou Halteres)',
          sets: 3,
          reps: '12-15',
          rest: '60 segundos',
        },
      ],
    },
    INFERIORES: {
      name: 'Inferiores Completo',
      exercises: [
        {
          name: 'Agachamento Livre (ou Agachamento no Smith)',
          sets: 4,
          reps: '8-12',
          rest: '90 segundos',
        },
        {
          name: 'Leg Press',
          sets: 4,
          reps: '10-12',
          rest: '90 segundos',
        },
        {
          name: 'Afundo (ou Avanço)',
          sets: 3,
          reps: '10-12 (cada perna)',
          rest: '60-90 segundos',
        },
        {
          name: 'Cadeira Extensora (para quadríceps)',
          sets: 3,
          reps: '12-15',
          rest: '60 segundos',
        },
        {
          name: 'Cadeira Flexora (para isquiotibiais)',
          sets: 3,
          reps: '12-15',
          rest: '60 segundos',
        },
        {
          name: 'Stiff (com Barra ou Halteres, para isquiotibiais e glúteos)',
          sets: 3,
          reps: '10-12',
          rest: '90 segundos',
        },
        {
          name: 'Panturrilha em Pé (ou Leg Press para Panturrilha)',
          sets: 4,
          reps: '15-20',
          rest: '60 segundos',
        },
      ],
    },
    A: {
      name: 'Peito, triceps e ombro',
      exercises: [
        {
          name: 'Supino Reto (Barra ou Halteres)',
          sets: 4,
          reps: '8-12',
          rest: '90 segundos',
        },
        {
          name: 'Supino Inclinado (Barra ou Halteres)',
          sets: 4,
          reps: '8-12',
          rest: '90 segundos',
        },
        {
          name: 'Desenvolvimento de Ombros (Barra ou Halteres)',
          sets: 4,
          reps: '8-12',
          rest: '90 segundos',
        },
        {
          name: 'Crossover (na Polia)',
          sets: 3,
          reps: '12-15',
          rest: '60 segundos',
        },
        {
          name: 'Tríceps na Polia Alta (com barra ou corda)',
          sets: 3,
          reps: '10-12',
          rest: '60 segundos',
        },
        {
          name: 'Mergulho (ou Paralelas)',
          sets: 3,
          reps: '8-12',
          rest: '60 segundos',
        },
        {
          name: 'Elevação Lateral de Ombro (com Halteres)',
          sets: 3,
          reps: '12-15',
          rest: '60 segundos',
        },
      ],
    },
    B: {
      name: 'Costa biceps e ombro',
      exercises: [
        {
          name: 'Barra Fixa (ou Puxada na Polia Alta, Pegada Pronada)',
          sets: 4,
          reps: '8-12',
          rest: '90 segundos',
        },
        {
          name: 'Remada Curvada (com Barra ou Halteres)',
          sets: 4,
          reps: '8-12',
          rest: '90 segundos',
        },
        {
          name: 'Remada Unilateral (com Halteres ou Polia Baixa)',
          sets: 3,
          reps: '10-12 (cada perna)',
          rest: '60 segundos',
        },
        {
          name: 'Pullover (com Halteres ou na Polia Alta)',
          sets: 3,
          reps: '12-15',
          rest: '60 segundos',
        },
        {
          name: 'Rosca Direta (com Barra ou Halteres)',
          sets: 3,
          reps: '10-12',
          rest: '60 segundos',
        },
        {
          name: 'Rosca Martelo (com Halteres)',
          sets: 3,
          reps: '10-12',
          rest: '60 segundos',
        },
        {
          name: 'Elevação Frontal de Ombro (com Halteres ou na Polia)',
          sets: 3,
          reps: '12-15',
          rest: '60 segundos',
        },
      ],
    },
    C: {
      name: 'Perna Completo',
      exercises: [
        {
          name: 'Agachamento Livre',
          sets: 4,
          reps: '10',
          rest: '120 segundos',
        },
        {
          name: 'Leg Press',
          sets: 3,
          reps: '12',
          rest: '90 segundos',
        },
        {
          name: 'Cadeira Extensora',
          sets: 3,
          reps: '12-15',
          rest: '60 segundos',
        },
        {
          name: 'Cadeira Flexora',
          sets: 3,
          reps: '12-15',
          rest: '60 segundos',
        },
      ],
    },
    D: {
      name: 'Posterior de Coxa',
      exercises: [
        {
          name: 'Stiff (com Barra ou Halteres)',
          sets: 4,
          reps: '10-12',
          rest: '90 segundos',
        },
        {
          name: 'Cadeira Flexora',
          sets: 3,
          reps: '12-15',
          rest: '60 segundos',
        },
        {
          name: 'Afundo (ou Avanço)',
          sets: 3,
          reps: '10-12 (cada perna)',
          rest: '60-90 segundos',
        },
      ],
    },
    E: {
      name: 'Quadríceps',
      exercises: [
        {
          name: 'Agachamento Livre',
          sets: 4,
          reps: '10',
          rest: '120 segundos',
        },
        {
          name: 'Leg Press',
          sets: 3,
          reps: '12',
          rest: '90 segundos',
        },
        {
          name: 'Cadeira Extensora',
          sets: 3,
          reps: '12-15',
          rest: '60 segundos',
        },
      ],
    },
  };

  // Dias da semana
  const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  // Estado para a rotina selecionada
  const [routine, setRoutine] = useState('ABC');

  // Estado para o dia atual e o treino correspondente
  const [currentDay, setCurrentDay] = useState(new Date().getDay()); // 0 (Domingo) a 6 (Sábado)
  const [currentWorkout, setCurrentWorkout] = useState('');

  // Função para determinar o treino do dia com base na rotina
  const getWorkoutForDay = (dayIndex, routine) => {
    if (routine === 'AB') {
      // Para a rotina AB, alterna entre SUPERIORES e INFERIORES
      return dayIndex % 2 === 0 ? 'SUPERIORES' : 'INFERIORES';
    } else {
      // Para outras rotinas, usa a lógica padrão
      const routineLength = routine.length;
      const workoutIndex = dayIndex % routineLength;
      return routine.charAt(workoutIndex);
    }
  };

  // Atualiza o treino do dia ao mudar a rotina ou o dia da semana
  useEffect(() => {
    const workout = getWorkoutForDay(currentDay, routine);
    setCurrentWorkout(workout);

    // Armazena no localStorage
    localStorage.setItem('currentDay', currentDay);
    localStorage.setItem('currentWorkout', workout);
    localStorage.setItem('routine', routine);
  }, [routine, currentDay]);

  // Recupera o dia e o treino do localStorage ao carregar o componente
  useEffect(() => {
    const savedDay = localStorage.getItem('currentDay');
    const savedWorkout = localStorage.getItem('currentWorkout');
    const savedRoutine = localStorage.getItem('routine');

    if (savedDay !== null && savedWorkout !== null && savedRoutine !== null) {
      setCurrentDay(parseInt(savedDay));
      setCurrentWorkout(savedWorkout);
      setRoutine(savedRoutine);
    }
  }, []);

  // Função para mudar a rotina
  const handleRoutineChange = (e) => {
    setRoutine(e.target.value);
  };

  return (
    <div className="workout-routine-container">
      <h1>Rotina de Treino</h1>
      <select value={routine} onChange={handleRoutineChange}>
        <option value="AB">AB</option>
        <option value="ABC">ABC</option>
        <option value="ABCD">ABCD</option>
        <option value="ABCDE">ABCDE</option>
      </select>

      <div className = "workout-today">
        <h2>
          Hoje é {daysOfWeek[currentDay]} - Treino {currentWorkout}:{' '}
          {workouts[currentWorkout]?.name}
        </h2>
        
          {workouts[currentWorkout]?.exercises.map((exercise, index) => (
            <ul key={index}>
              <strong>{exercise.name}</strong>
              <br />
              Séries: {exercise.sets}
              <br />
              Repetições: {exercise.reps}
              <br />
              Descanso: {exercise.rest}
            </ul>
          ))}
        
      </div>

      <div className= "workout-weekly-schedule">
        <h2>Próximos Treinos da Semana:</h2>
        
          {daysOfWeek.map((day, index) => {
            const workout = getWorkoutForDay(index, routine);
            return (
              <ul className="exercise-list" key={index}>
                {day}: Treino {workout} - {workouts[workout]?.name}
              </ul>
            );
          })}
       
      </div>

     

      
    </div>
  );
};

export default WorkoutRoutine;