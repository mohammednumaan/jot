import { Link } from "react-router";
import Button from "../Form/components/Button";

export default function NotFoundError() {
  return (
    <div className="h-[90vh] flex justify-center items-center flex-col">
      <div className="flex flex-col gap-10">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-violet-900 to-[#826684]">
          404: Page Not Found
        </h1>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  );
}
