import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("taskflow_token");

  const handleLogout = () => {
    localStorage.removeItem("taskflow_token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900 text-white">
      <div className="text-xl font-bold">TaskFlow</div>
      <div className="flex items-center gap-4">
        {token ? (
          <Button 
            onClick={handleLogout}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            লগআউট
          </Button>
        ) : (
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
