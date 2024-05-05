import "./App.css";
import Button from "./components/Button/Button";
import JournalItem from "./components/JournalItem/JournalItem";

function App() {
   const data = [
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
   return (
      <>
         <div>Vite React</div>
         <Button name="Сохранить" />
         <JournalItem data={data} />
      </>
   );
}

export default App;
