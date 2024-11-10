import { useEffect, useState } from "react";
import './App.css'

function App() {

const [products, setProducts] = useState([])

useEffect(() => {
  loadProducts()
}, [])

async function loadProducts(){
  let res = await fetch('http://localhost:2000/api/product')
  let resJson = await res.json()
  setProducts(resJson)
}

async function onChange(fieldName, value, productIndex) {
  let newProducts = [...products]
  newProducts[productIndex][fieldName] = value
  setProducts(newProducts)
}

  return (
    <div className="max-width-500px flex-direction-column"> 
      {products.map((product, productIndex) => {
        return(
          <div key={productIndex} className="max-width-500px flex-direction-column">
  
          {/* HEADER */}
         <div>
          <input className="widht-100pct font-size-xx-large text-align-center"
          value={product.name}
          onChange={(e) => {
            let value = e.target.value
            onChange('name', value, productIndex)   
          }}/>
          </div>
      
         {/* IMAGE */}
          <div className="flex-direction-column">
          <img className="widht-100pct" src={product.image}/>
          <input value={product.image}
          onChange={(e) => {
            let value = e.target.value
            onChange('image', value, productIndex)   
          }}/>
          </div>
      
         {/* INGREDIENTS */}
         <div className="flex-direction-column">{
         product.ingredients.map((ingredient, ingredientIndex) => {
          return (
            <div>
            <input value={ingredient}
              key={ingredientIndex}
              onChange={(e) => {
              let value = e.target.value 
              let newProducts = [...products]
              newProducts[productIndex].ingredients[ingredientIndex] = value
              setProducts(newProducts)
            }} />
              <div className="color-red"
              onClick={() => {
                let newProducts = [... products]
                newProducts[productIndex].ingredients.splice(ingredientIndex, 1)
                setProducts(newProducts)
              }}
              >Удалить</div>
            </div>
            )
         })
        }
          <div className="color-blue"
          onClick={(e) => {
            let newProducts = [... products]
            newProducts[productIndex].ingredients.push('Новый ингредиент')
            setProducts(newProducts)
          }}
          >Добавить ингредиент</div>
          </div>
      
         {/* DESCRIPTION */}
          <textarea value={product.description} rows={4}
            onChange={(e) => {
            let value = e.target.value
            onChange('description', value, productIndex)   
          }}
          >
          </textarea>
      
          <button
          onClick={async ()=>{
            let res = await fetch('http://localhost:2000/api/product', 
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(product)
              }
            )
            let resJson = await res.json()
            console.log(resJson);
          }}
          className="background-color-orange">Сохранить</button>
      
          </div>)  
      })} 

        <div className="color-blue"
          onClick={(e) => {
            let newProducts = [... products]
            newProducts.push({
              name: "Новое",
              image: "https://i.postimg.cc/0rRJDyX9/omlet.jpg",
              ingredients: [
                "Ингридиент 1",
                "Ингридиент 2",
                "Ингридиент 3"
              ],
              description: "Описание",
            })
            setProducts(newProducts)
          }}
          >ДОБАВИТЬ</div>

    </div>
  );
}

export default App;
