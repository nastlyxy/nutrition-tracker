import FoodCard from "./FoodCard"

export default function FoodList({foods, targetCalories}){
    return (
        <div className="mt-4">
            {foods.map(food =>(
                <FoodCard key={food.id} food={food} targetCalories={targetCalories}/>
            ))}
        </div>
    )

}