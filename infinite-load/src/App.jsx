import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data,setData] = useState([])
  const [page,setPage] = useState(1)

   useEffect(()=>{
    getData();
   },[page])

   const getData = ()=>{
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=${page}&sparkline=false`).then((response)=>{
      return response.json()
    }).then((response)=>setData(prev=>[...prev,...response]))
   }

   useEffect(()=>{
    window.addEventListener("scroll",handleScroll)
   },[])

   const handleScroll = ()=>{
     console.log("height:",document.documentElement.scrollHeight);
     console.log("top:",document.documentElement.scrollTop);
     console.log(window.innerHeight)

     if(document.documentElement.scrollTop + window.innerHeight + 1 >= document.documentElement.scrollHeight){
      setPage((prev)=>prev+1)
     }
     
   }

  return (
    <div className="App" style={{ backgroundColor:"black",color:"white" }} >
      <h1>Crypto</h1>
       <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)" }} >
       {data?.map((elem)=>(
          <div>
            <img src={elem.image} alt="" />
            <p>{elem.name}</p>
          </div>
        ))}
       </div>
    </div>
  );
}

export default App;
