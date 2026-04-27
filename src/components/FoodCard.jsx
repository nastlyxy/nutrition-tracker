export default function FoodCard({food}){
    return (
        <div className="">
            <details>
                <summary>
                    <p className="text-md font-bold">{food.name}</p>
                </summary>
                <div className="text-sm text-slate-500">ff</div>
            </details>
        </div>
    )

}