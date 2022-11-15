import { useParams } from "react-router-dom";
import DisplayCoffee from "../components/DisplayCoffee";
import { useEffect } from "react"

export default function HotCoffee({ coffeeList, getCoffee, addCoffee }){
    let params = useParams();

    useEffect(() => {getCoffee('hot')},[])

    return (
        <div className="coffee-view brown">
            {coffeeList.map((coffee) => {
                return (
                    <DisplayCoffee 
                        key={coffee.id}
                        coffee={coffee}
                        addCoffee={addCoffee}
                    />
                )
            })}
        </div>
    )
}
