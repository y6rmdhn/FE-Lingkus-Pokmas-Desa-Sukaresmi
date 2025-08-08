import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-600 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Konten utama footer dengan layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kolom 1: Info Desa */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-lg">
                {/* Placeholder untuk logo */}
              </div>
              <h3 className="text-xl font-bold">
                Kelompok Masyarakat Desa Sukaresmi
              </h3>
            </div>
            <p className="text-gray-200 text-sm">
              Alamat desa suka resmi ... ... ... ... ... ... ... ... ... ... ...
              ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ...
              ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ...
              ... ... ... ... ... ... ... ... ... ... ... ... ...
            </p>
          </div>

          {/* Kolom 2: Hubungi Kami */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaPhone size={18} />
                <span>(+62) 851-xxxx-xxxx</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope size={18} />
                <span>desasukaresmi@gmail.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-gray-300">
                <FaFacebook size={22} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaInstagram size={22} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaYoutube size={22} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <FaTiktok size={22} />
              </a>
            </div>
          </div>

          {/* Kolom 3: Kantor Desa */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Kantor Desa Sukaresmi</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Sekretaris Desa Sukaresmi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Ambulance Desa Sukaresmi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Bidan Desa Sukaresmi
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Garis & Copyright */}
      <div className="border-t border-white/20 text-center py-4 text-sm">
        © 2025 Powered by IT Mart
      </div>
    </footer>
  );
};

export default Footer;
