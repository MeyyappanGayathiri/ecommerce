import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import { useState } from "react";

function ShoppingLayout() {
  const [keyword, setKeyword] = useState("");

  function handleKeyword(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader keyword={keyword} handleKeyword={handleKeyword} />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
