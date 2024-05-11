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
   const [selectedItem, setSelectedItem] = useState();
   console.log(`selectedItem: `, selectedItem);
   console.log(`items: `, items);

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
               } else {
                  return i;
               }
            }),
         ]);
      }
   };

   return (
      <UserContextProvider>
         <div className="app">
            <LeftPanel>
               <Header />
               <JournalAddButton />
               <JournalList items={mapItems(items)} setItem={setSelectedItem} />
            </LeftPanel>
            <Body>
               <JournalForm onSubmit={addItem} data={selectedItem} />
            </Body>
         </div>
      </UserContextProvider>
   );
}

export default App;
