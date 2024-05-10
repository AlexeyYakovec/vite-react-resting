import { useLocalStorage } from "./hooks/useLocalStorage.hook";

import "./App.css";

// layout
import LeftPanel from "./layout/LeftPanel/LeftPanel";
import Body from "./layout/Body/Body";

// components
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";

import { UserContextProvider } from "./context/user.context";

// utils
import { mapItems } from "./utils/mapItemsForm";

function App() {
   const [items, setItems] = useLocalStorage("data");
   console.log(`App`);

   const addItem = (item) => {
      setItems([
         ...mapItems(items),
         {
            ...item,
            id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
            date: new Date(item.date),
         },
      ]);
   };

   return (
      <UserContextProvider>
         <div className="app">
            <LeftPanel>
               <Header />
               <JournalAddButton />
               <JournalList items={mapItems(items)} />
            </LeftPanel>
            <Body>
               <JournalForm onSubmit={addItem} />
            </Body>
         </div>
      </UserContextProvider>
   );
}

export default App;
