import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'
import { HomePage, LoginPage, ProfilePage } from "../scenes"

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage/>} />
        </Routes>
      </BrowserRouter>
  )
}
