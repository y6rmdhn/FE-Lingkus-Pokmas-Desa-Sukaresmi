import { Route, Routes } from "react-router-dom";
import Homepage from "./components/view/homepage/Homepage";
import PokmasDesa from "./components/view/profil/pokmasDesa/PokmasDesa";
import DesaSukaresmi from "./components/view/profil/desa/DesaSukaresmi";
import PokmasStruktur from "./components/view/profil/pokmasStruktur/PokmasStruktur";
import Struktur from "./components/view/profil/struktur/Struktur";
import DataStunting from "./components/view/kegiatan/dataStunting/DataStunting";
import FasilitasPublik from "./components/view/kegiatan/fasilittasPublic/FasilitasPublik";
import EdukasiMasyarakat from "./components/view/kegiatan/edukasiMasyarakat/EdukasiMasyarakat";
import DetailEdukasiMasyarakat from "./components/view/kegiatan/detailEdukasiMasyarakat/DetailEdukasiMasyarakat";
import ProdukUnggulanPage from "./components/view/kegiatan/produkUnggulan/ProdukUnggulan";
import DetailProdukUnggulan from "./components/view/kegiatan/detailProdukUnggulan/DetailProdukUnggulan";
import LoginPage from "./components/view/auth/login/Login";
import DataKelompokMasyarakat from "./components/view/admin/dataKelompokMasyarakat/DataKelompokMasyarakat";
import DataDesa from "./components/view/admin/dataDesa/DataDesa";
import StuntingPage from "./components/view/admin/dataStunting/DataStunting";
import DataFasilitasPublik from "./components/view/admin/dataFasilitasPublik/DataFasilitasPublik";
import DataEdukasiMasyarakat from "./components/view/admin/dataEdukasiMasyarakat/DataEdukasiMasyarakat";
import DataGaleri from "./components/view/admin/dataGaleri/DataGaleri";
import DataProdukUnggulan from "./components/view/admin/dataProdukUnggulan/DataProdukUnggulan";

function App() {
  return (
    <>
      <Routes>
        {/* auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin */}
        <Route
          path="/admin/data-kelompok-masyarakat"
          element={<DataKelompokMasyarakat />}
        />
        <Route path="/admin/data-desa" element={<DataDesa />} />
        <Route path="/admin/data-stunting" element={<StuntingPage />} />
        <Route
          path="/admin/data-fasilitas-publik"
          element={<DataFasilitasPublik />}
        />
        <Route
          path="/admin/data-edukasi-masyarakat"
          element={<DataEdukasiMasyarakat />}
        />
        <Route path="/admin/data-galeri" element={<DataGaleri />} />
        <Route
          path="/admin/data-produk-unggulan"
          element={<DataProdukUnggulan />}
        />

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
        <Route path="/kegiatan/data-stunting" element={<DataStunting />} />
        <Route
          path="/kegiatan/fasilitas-publik"
          element={<FasilitasPublik />}
        />
        <Route
          path="/kegiatan/edukasi-masyarakat"
          element={<EdukasiMasyarakat />}
        />
        <Route
          path="/kegiatan/edukasi-masyarakat/detail"
          element={<DetailEdukasiMasyarakat />}
        />
        <Route
          path="/kegiatan/produk-unggulan"
          element={<ProdukUnggulanPage />}
        />
        <Route
          path="/kegiatan/produk-unggulan/detail"
          element={<DetailProdukUnggulan />}
        />
      </Routes>
    </>
  );
}

export default App;
