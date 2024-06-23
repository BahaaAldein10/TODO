import { ListTodo } from "lucide-react";

function Navbar() {
  return (
    <nav className="container sm:w-4/5 w-full mt-5">
      <h1 className="flex items-center gap-2 text-2xl font-semibold">
        <ListTodo size={50} />
        TODO
      </h1>
    </nav>
  );
}

export default Navbar;
