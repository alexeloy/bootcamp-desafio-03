import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])


  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "github.test",
      techs: []
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
    // TODO
  }

  async function handleRemoveRepository(id) {
    //const { index } = id;
    //const index = 0;
    //console.log(id);
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex >= 0) {



      //console.log(repositories[index]);


      //const uuid = repositories[index].id;
      const filteredRepositories = repositories.filter(repository => repository.id !== id)




      setRepositories(filteredRepositories);

      api.delete(`repositories/${id}`);

      console.log(id)



    }




  }

  return (
    <div>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id} >
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>

        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
