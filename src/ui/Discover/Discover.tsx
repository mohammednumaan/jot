import { Link } from "react-router";

export default function Discover() {
  return (
    <h1 className="h-[80vh] flex justify-center items-center">
      <Link to="/client/create">Discover Jots</Link>
    </h1>
  );
}
