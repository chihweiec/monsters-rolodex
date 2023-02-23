import { useEffect, useState } from 'react';
import CardList from './components/cardList/card-list.component';

import './App.css';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {

  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => {
      setMonsters(users);
    });
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox onChangeHandler={onSearchChange} placeholder={'search monsters'} className={'search-box'}/>
      <CardList monsters={filteredMonsters} anything={[]}/>
    </div>
  );
}

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then((users) => {
//       this.setState(
//         () => {
//           return {monsters: users};
//         }
//       );
//     });
//   };

//   // gonna build this function once when this component is initialized, since it's not changing.
//   // If we keep this anonymous inline, it will be created and throw away once and once again on each render
//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     // "AaaaAaA" => "aaaaaaa"
//     // [ { name: 'Leanne' }, { name: 'Yihua' } ]
//     this.setState(() => {
//       return { searchField };
//     });
//   }

//   render() {
//     // more readable 
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox onChangeHandler={onSearchChange} placeholder={'search monsters'} className={'search-box'}/>
//         <CardList monsters={filteredMonsters} anything={[]}/>
//       </div>
//     );
//   }
// }

export default App;
