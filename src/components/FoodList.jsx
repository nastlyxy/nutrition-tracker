import FoodCard from "./FoodCard"

export default function FoodList({foods}){
    return (
        <div className="">
            {foods.map(food =>(
                <FoodCard key={food.id} food={food}/>
            ))}
        </div>
    )

}