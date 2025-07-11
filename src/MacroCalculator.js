import React, { useState } from "react";

export default function MacroCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState(""); // in kg
  const [height, setHeight] = useState(""); // in cm
  const [activity, setActivity] = useState("sedentary");
  const [goal, setGoal] = useState("maintenance");
  const [result, setResult] = useState(null);

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const handleCalculate = () => {
    if (!age || !weight || !height) {
      alert("Please fill all fields");
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation for men (you can add women later)
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    // Adjust for activity level
    let maintenanceCalories = bmr * activityFactors[activity];

    // Adjust for goal
    if (goal === "cutting") maintenanceCalories -= 500;
    else if (goal === "bulking") maintenanceCalories += 500;

    // Protein: 2.0g per kg of bodyweight
    const proteinGrams = weight * 2;
    const proteinCalories = proteinGrams * 4;

    // Fat: 25% of total calories (can be adjusted)
    const fatCalories = maintenanceCalories * 0.25;
    const fatGrams = fatCalories / 9;

    // Carbs: remaining calories
    const carbCalories = maintenanceCalories - (proteinCalories + fatCalories);
    const carbGrams = carbCalories / 4;

    setResult({
      calories: Math.round(maintenanceCalories),
      protein: Math.round(proteinGrams),
      fat: Math.round(fatGrams),
      carbs: Math.round(carbGrams),
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Macro Calculator</h2>
      <div className="mb-2">
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-1 border rounded"
        />
      </div>
      <div className="mb-2">
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-1 border rounded"
        />
      </div>
      <div className="mb-2">
        <label>Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-1 border rounded"
        />
      </div>
      <div className="mb-2">
        <label>Activity Level:</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full p-1 border rounded"
        >
          <option value="sedentary">Sedentary (little/no exercise)</option>
          <option value="light">Light (1-3 days/week)</option>
          <option value="moderate">Moderate (3-5 days/week)</option>
          <option value="active">Active (6-7 days/week)</option>
          <option value="veryActive">Very Active (very intense daily)</option>
        </select>
      </div>
      <div className="mb-2">
        <label>Goal:</label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-1 border rounded"
        >
          <option value="cutting">Cutting (lose fat)</option>
          <option value="maintenance">Maintenance</option>
          <option value="bulking">Bulking (gain muscle)</option>
        </select>
      </div>
      <button
        onClick={handleCalculate}
        className="w-full py-2 bg-blue-600 text-white rounded mt-4"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-2">Your Daily Macros</h3>
          <p>Calories: {result.calories} kcal</p>
          <p>Protein: {result.protein} g</p>
          <p>Fat: {result.fat} g</p>
          <p>Carbs: {result.carbs} g</p>
        </div>
      )}
    </div>
  );
