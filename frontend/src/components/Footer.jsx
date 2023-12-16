import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="fixed absolute bottom-0  p-5 w-full bg-gray-700 p-4 text-white text-center">
      <p>Viajes App <Link to="https://epica.digital/" target="_blank" className="color">EPICA 2023</Link></p>
    </footer>
  )
}