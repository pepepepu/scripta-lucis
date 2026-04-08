import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  SelectSong,
  SongDetails,
  SongLyrics,
  SharePreview,
} from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selecionar-musica" element={<SelectSong />} />
        <Route path="/musica/:id" element={<SongDetails />} />
        <Route path="/musica/:id/letra" element={<SongLyrics />} />
        <Route path="/compartilhar" element={<SharePreview />} />
      </Routes>
    </BrowserRouter>
  );
}
