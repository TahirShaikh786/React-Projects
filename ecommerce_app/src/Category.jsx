import React from "react";

export default function Category({ finalCategory,setcatName }) {
  let cat = finalCategory.map((v, i) => {
    return <li onClick={()=>setcatName(v.name)} key={i}> {v.name} </li>;//onclick is prop drilling
  });
  return (
    <div>
      <h3>Product Category</h3>
      <ul>{cat}</ul>
    </div>
  );
}
