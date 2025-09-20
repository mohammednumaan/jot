import { Link } from "react-router";
import { useAuth } from "../../core/context/auth.context";

export default function Navigation() {
  const { username } = useAuth(); 
  return (
    <div className="flex justify-between items-center p-5 bg-[#080808] rounded-xl mb-10">
      <div>
        <h2 className="text-2xl text-[#543A8B]">Jot.</h2>
      </div>

      {/* this is the navigation links (links to profile and new jot creation) */}
      <div className="flex justify-center items-center gap-10">
        <div title="Discover Jots">
          <Link to="/discover">
            <img src="/public/icons/explore.svg" />
          </Link>
        </div>
        <div title="Create Jot">
          <Link to="/create">
            <img src="/public/icons/create.svg" />
          </Link>
        </div>
        <div title="View Profile">
          <Link to={`/profile/${username}`}>
            <img src="/public/icons/profile_circle.svg" />
          </Link>
        </div>
      </div>
    </div>
  );
}
