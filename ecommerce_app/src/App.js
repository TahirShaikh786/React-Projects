import "./App.css";
import Category from "./Category";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  let [finalCategory, setFinalCategory] = useState([]);
  let [finalProduct, setFinalProduct] = useState([]);
  let [catName, setcatName] = useState('');

  let getCategory = () => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => res.data)
      .then((finalRes) => {
        setFinalCategory(finalRes);
      });
  };

  let getProduct = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((proRes) => proRes.data)
      .then((finalRes) => {
        setFinalProduct(finalRes.products);
      });
  };

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);

  useEffect(() => {
    if (catName !== "") {
      axios
        .get(`https://dummyjson.com/products/category/${catName}`)
        .then((proRes) => proRes.data)
        .then((finalRes) => {
          setFinalProduct(finalRes.products);
        });
    }
  }, [catName]);

  let Pitems = finalProduct.map((products, index) => {
    return <ProductItem key={index} pData={products} />;
  });

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="row m-0 p-0 mainContainer">
          <h1 className="text-center">Our Products</h1>
          <div className="col-3 m-0 categoryContainer">
            <Category finalCategory={finalCategory} setcatName={setcatName} />
          </div>
          <div className="col-9 boxContainer ">
            {finalProduct.length >= 1 ? Pitems : "No Product Found"}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

function ProductItem({ pData }) {
  return (
    <div className="col-3 p-2">
      <div className="box">
        <img src={pData.thumbnail} alt="." />
        <h4>{pData.title}</h4>
        <p>{pData.price}</p>
      </div>
    </div>
  );
}
