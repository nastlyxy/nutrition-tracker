import FoodCard from "./FoodCard"

export default function FoodList({foods, onDeleteFood}){
    return (
        <div className="mt-4">
            {foods.map(food =>(
                <FoodCard key={food.id} food={food} onDeleteFood={onDeleteFood}/>
            ))}
        </div>
    )

}