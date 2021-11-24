import React, {useContext, useReducer, useEffect} from "react";
import './App.css';

const HOST_API = "http://localhost:8080/api"
const initialState = {
  list: []
}
const Store = createContext(initialState)

const List = () =>{
  const{dispatch, state} = useContext(Store);
  
  useEffect(() =>{
    fetch(HOST_API+"/todos")
    .then(response => response.json())
    .then((list) => {
      dispatch({type: "update-list", list})
    })
  }, [state.list.length, dispatch]);

  return <div>
  <table >
    <thead>
      <tr>
        <td>ID</td>
        <td>Nombre</td>
        <td>¿Completado?</td>
      </tr>
    </thead>
    <tbody>
      {state.List.map((todo) => {
        return <tr key={todo.id}>
          <td>{todo.id}</td>
          <td>{todo.name}</td>
          <td>{todo.isComplete}</td>
        </tr>
      })}
    </tbody>
  </table>
</div>
}

function reducer(state, action) {
  switch (action.type) {
    case 'update-list':
      return {...state, list: action.list}
      case 'add-item':
        const newList = state.list;
        newList.push(action, item);
        return {...state, list: newList}
    default:
      return state;
  }
}

const StoreProvider = ({children}) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value = {{state,dispatch}}>
    {children}
  </Store.Provider>
}


function App() {
  return (
    <StoreProvider>
      <List />
    </StoreProvider>
  );
}

export default App;

