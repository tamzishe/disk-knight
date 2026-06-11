import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();
  return <button className="bottomBtn" onClick={() => navigate("/")}>← Home</button>;
}
