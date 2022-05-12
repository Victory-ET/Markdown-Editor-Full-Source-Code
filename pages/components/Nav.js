import { React, useState } from "react";

const Nav = ({ display, current, save, Delete }) => {
  const [open, isOpen] = useState(false);
  let toggler = false;
  return (
    <div>
      <nav className=" shadow-lg fixed w-full z-10 backdrop-blur-md">
        <span className="w-full">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center items mx-20 justify-between w-full flex-row">
              <span className="flex items-center justify-center flex-shrink-0">
                <h1 className=" font-bold cursor-pointer text-xl text-gray-400">
                  {`{M}`}
                  <span className=" text-blue-500">Editor</span>
                </h1>
              </span>
              <span className=" text-white">
                Currently Editing: {current.name}
              </span>
              <span className="hidden md:block">
                <div className=" ml-10 flex items-baseline space-x-4">
                  <button
                    className="cursor-pointer text-blue-500 font-semibold px-3 py-2 text-md"
                    onClick={() => {
                      display(!toggler);
                      toggler = true;
                    }}
                  >
                    Create new file
                  </button>
                  <button
                    className="bg-blue-500 inline-flex items-center justify-center py-2  px-4 rounded-md text-white outline-none "
                    onClick={() => {
                      save(current);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 inline-flex items-center justify-center py-2  px-4 rounded-md text-white outline-none "
                    onClick={() => {
                      Delete(current);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </span>
            </div>
            <span className="mr-10 flex md:hidden">
              <button
                onClick={() => {
                  isOpen(!open);
                }}
                className="bg-blue-500 inline-flex items-center justify-center p-2 rounded-md text-white outline-none focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                arial-aria-controls="mobile-menu"
                arial-aria-expanded="false"
              >
                <span className=" sr-only">Main menu</span>
                {!open ? (
                  <svg
                    className=" block h-6 w-6"
                    xmlns="http:www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    arial-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className=" block h-6 w-6"
                    xmlns="http:www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    arial-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </span>
          </div>
        </span>

        {open ? (
          <div className=" md:hidden id=mobile-menu">
            <div className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  display(!toggler);
                  toggler = true;
                }}
                className="cursor-pointer text-black block px-3 py-2 rounded-md text-base font-medium"
              >
                Create New File
              </button>
              <button
                onClick={() => {
                  save(current);
                }}
                className="cursor-pointer font-medium bg-blue-500 inline-flex items-center justify-center py-2  px-4 rounded-md text-white hover:bg-blue-600 outline-none"
              >
                Save
              </button>
              <button
                className="bg-red-500 inline-flex items-center justify-center py-2  px-4 rounded-md text-white outline-none "
                onClick={() => {
                  Delete(current);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
