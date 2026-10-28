import React, {useState} from 'react'
import "./FarmSimulator.css";

function FarmSimulator() {
    const [animals, setAnimals] = useState(() => {
        return JSON.parse(localStorage.getItem("farmAnimals")) || []
    }) 
    const [type, setType] = useState("Інший");
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);

    const saveToStorage = (newAnimals) => {
        localStorage.setItem("farmAnimals", JSON.stringify(newAnimals))
        setAnimals(newAnimals)
    } 

    const addAnimal = (animal) => {
        const newAnimals = [...animals, animal]
        saveToStorage(newAnimals)
    }

    const removeAnimal = (id) => {
        const newAnimals = animals.filter(animal => animal.id !== id)
        saveToStorage(newAnimals)
    }

    const feedAnimal = (id) => {
        const newAnimals = animals.map(animal =>
            animal.id === id ? {...animal, hunger: Math.max(0, animal.hunger - 10)} : animal
        )
        saveToStorage(newAnimals)
    }

    const ageAnimal = (id) => {
        const newAnimals = animals.map(animal =>
            animal.id === id ? {...animal, age: animal.age + 1} : animal
        )
        saveToStorage(newAnimals)
    }

    const increaseHunger = (id) => {
        const newAnimals = animals.map(animal =>
            animal.id === id ? { ...animal, hunger: Math.min(100, animal.hunger + 10) } : animal
    );

    saveToStorage(newAnimals)
    } 

    const handleSubmit = (e) => {
        e.preventDefault()

        const animal = {
            id: crypto.randomUUID(),
            type: type,
            name: name,
            age: Number(age),
            hunger: 0
        };

        addAnimal(animal);

        setName("");
        setAge(0);
    }


    return (
        <div className="farm-simulator">
            <h1>Ферма</h1>

            <div className="animal-form">
                <form onSubmit={handleSubmit}>
                    <select value={type} onChange={e => setType(e.target.value)}>
                        <option value="Корова">Корова</option>
                        <option value="Свинья">Свиня</option>
                        <option value="Курица">Курка</option>
                        <option value="Овца">Вівця</option>
                        <option value="Інший">Інша тварина</option>
                    </select>

                    <input type="text" placeholder="Ім'я" value={name} onChange={e => setName(e.target.value)} required/>

                    <input type="number" placeholder="Вік" min="0" value={age} onChange={e => setAge(Number(e.target.value))} required/>

                    <button type="submit">Додати тварину</button>
                </form>

            </div>

            <div className="animals-list">
                {animals.map(animal => (
                    <div key={animal.id} className="animal-card">
                        <h3>{animal.name}</h3>
                        <p>Тип: {animal.type}</p>
                        <p>Возраст: {animal.age}</p>
                        <p>Голод: {animal.hunger}</p>

                        <progress value={animal.hunger} max="100"></progress>
                        <button onClick={() => feedAnimal(animal.id)}>Годувати</button>
                        <button onClick={() => ageAnimal(animal.id)}>Збільшити вік</button>
                        <button onClick={() => increaseHunger(animal.id)}>Збільшити голод</button>
                        <button onClick={() => removeAnimal(animal.id)}>Видалити</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FarmSimulator;