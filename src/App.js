// import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ListOfParticipants from "./Components/ListOfParticipants";
import RaceTrack from "./Components/RaceTrack";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ListOfParticipants />} />
      <Route path="/race-track" element={<RaceTrack />} />
    </Routes>
  );
};

export default App;
