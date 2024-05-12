import { useLocalStorage } from "./hooks/useLocalStorage.hook";
import { useState } from "react";

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
   const [selectedItem, setSelectedItem] = useState(null);

   const addItem = (item) => {
      if (!item.id) {
         setItems([
            ...mapItems(items),
            {
               ...item,
               date: new Date(item.date),
               id:
                  items.length > 0
                     ? Math.max(...items.map((i) => i.id)) + 1
                     : 1,
            },
         ]);
      } else {
         setItems([
            ...mapItems(items).map((i) => {
               if (i.id === item.id) {
                  return {
                     ...item,
                  };
               }
               return i;
            }),
         ]);
      }
   };

   const deleteItem = (id) => {
      setItems([...items.filter((i) => i.id !== id)]);
   };

   return (
      <UserContextProvider>
         <div className="app">
            <LeftPanel>
               <Header />
               <JournalAddButton clearForm={() => setSelectedItem(null)} />
               <JournalList items={mapItems(items)} setItem={setSelectedItem} />
            </LeftPanel>
            <Body>
               <JournalForm
                  onSubmit={addItem}
                  onDelete={deleteItem}
                  data={selectedItem}
               />
            </Body>
         </div>
      </UserContextProvider>
   );
}

export default App;
