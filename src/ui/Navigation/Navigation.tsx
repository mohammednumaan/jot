import { Link } from "react-router";

export default function Navigation() {
  return (
    <div className="flex justify-between items-center p-5 bg-[#080808] rounded-xl mb-10">
      <div>
        <h2 className="text-2xl text-[#543A8B]">Jot.</h2>
      </div>

      {/* this is the navigation links (links to profile and new jot creation) */}
      <div className="flex justify-center items-center gap-10">
        <div title="Discover Jots">
          <Link to="/client/discover">
            <img src="/public/icons/explore.svg" />
          </Link>
        </div>
        <div title="Create Jot">
          <Link to="/client/create">
            <img src="/public/icons/create.svg" />
          </Link>
        </div>
        <div title="View Profile">
          <Link to="/profile">
            <img src="/public/icons/profile_circle.svg" />
          </Link>
        </div>
      </div>
    </div>
  );
}
