import { useState } from "react";

import "./App.css";
// layout
import LeftPanel from "./layout/LeftPanel/LeftPanel";
import Body from "./layout/Body/Body";

// components
import CardButton from "./components/CardButton/CardButton";
import JournalItem from "./components/JournalItem/JournalItem";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";

function App() {
   const INITIAL_DATA = [
      {
         title: "Подготовка к обновлению ресурсов",
         text: "Горные походы открывают удивительные природные ландшафты",
         date: new Date(),
      },
      {
         title: "Поход в горы",
         date: new Date(),
         text: "Думал что времени очень много....",
      },
   ];

   const [items, setItems] = useState(INITIAL_DATA);
   const addItem = (item) => {
      setItems((prevItems) => [
         ...prevItems,
         {
            title: item.title,
            text: item.text,
            date: new Date(item.date),
         },
      ]);
   };

   return (
      <div className="app">
         <LeftPanel>
            <Header />
            <JournalAddButton />
            <JournalList>
               {items.map((item, id) => {
                  return (
                     <CardButton key={id}>
                        <JournalItem
                           title={item.title}
                           text={item.text}
                           date={item.date}
                        />
                     </CardButton>
                  );
               })}
            </JournalList>
         </LeftPanel>
         <Body>
            <JournalForm onSubmit={addItem} />
         </Body>
      </div>
   );
}

export default App;
