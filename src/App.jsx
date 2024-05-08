import "./App.css";
// layout
import LeftPanel from "./layout/LeftPanel/LeftPanel";
import Body from "./layout/Body/Body";

// components
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useLocalStorage } from "./hooks/useLocalStorage.hook";

function App() {
   function mapItems(items) {
      if (!items) {
         return [];
      }
      return items.map((i) => ({ ...i, date: new Date(i.date) }));
   }

   const [items, setItems] = useLocalStorage("data");

   const addItem = (item) => {
      setItems([
         ...mapItems(items),
         {
            id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
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
            <JournalList items={mapItems(items)} />
         </LeftPanel>
         <Body>
            <JournalForm onSubmit={addItem} />
         </Body>
      </div>
   );
}

export default App;
