import { Route, Routes } from "react-router-dom";
import Homepage from "./components/view/homepage/Homepage";
import PokmasDesa from "./components/view/profil/pokmasDesa/PokmasDesa";
import DesaSukaresmi from "./components/view/profil/desa/DesaSukaresmi";
import PokmasStruktur from "./components/view/profil/pokmasStruktur/PokmasStruktur";
import Struktur from "./components/view/profil/struktur/Struktur";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profil/pokmas-desa-sukaresmi" element={<PokmasDesa />} />
        <Route path="/profil/desa-sukaresmi" element={<DesaSukaresmi />} />
        <Route
          path="/profil/struktur-pokmas-desa-sukaresmi"
          element={<PokmasStruktur />}
        />
        <Route
          path="/profil/struktur-organisasi-desa-sukaresmi"
          element={<Struktur />}
        />
      </Routes>
    </>
  );
}

export default App;
