import React,{useEffect,useState} from 'react'

const List = () => {
    const [state, setstate] = useState([])
    useEffect(()=>{
       fetch("https://jsonplaceholder.typicode.com/todos").then(
            res=>res.json().then(data=>setstate(data))
        )
    })
    return (
        <center>
            <ol>
            {state.map(item=><li key={item.id}>{item.title}</li>)}
            </ol>
        </center>
    )
}

export default List
