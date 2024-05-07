import { useState, useEffect } from "react";

import "./App.css";
// layout
import LeftPanel from "./layout/LeftPanel/LeftPanel";
import Body from "./layout/Body/Body";

// components
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";

function App() {
   //    const INITIAL_DATA = [
   //       {
   //          id: 1,
   //          title: "Подготовка к обновлению ресурсов",
   //          text: "Горные походы открывают удивительные природные ландшафты",
   //          date: new Date(),
   //       },
   //       {
   //          id: 2,
   //          title: "Поход в горы",
   //          text: "Думал что времени очень много....",
   //          date: new Date(),
   //       },
   //    ];

   const [items, setItems] = useState([]);

   useEffect(() => {
      const data = JSON.parse(localStorage.getItem("data"));
      if (data) {
         setItems(
            data.map((item) => ({
               ...item,
               date: new Date(item.date),
            }))
         );
      }
   }, []);

   useEffect(() => {
      if (items.length) {
         localStorage.setItem("data", JSON.stringify(items));
      }
   }, [items]);

   const addItem = (item) => {
      setItems((prevState) => [
         ...prevState,
         {
            id:
               prevState.length > 0
                  ? Math.max(...prevState.map((i) => i.id)) + 1
                  : 1,
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
            <JournalList items={items} />
         </LeftPanel>
         <Body>
            <JournalForm onSubmit={addItem} />
         </Body>
      </div>
   );
}

export default App;
