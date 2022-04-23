import { React, useState } from "react";
import Nav from "./Nav";
import FileList from "./FileList";

const Editor = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Nav />
      <div className="relative bg-slate-900">
        <div className="relative h-full flex flex-row pt-28">
          <FileList />
          <div className=" w-3/4 h-screen border border-slate-900 py-8 px-8">
            <button className="cursor-pointer relative text-blue-500 font-semibold text-md" onClick={()=>{setShow(!show)}}>{show? "Edit" : "Preview"}</button>
            {!show ? (
              // text area to type markdown
              <textarea
                className=" bg-slate-900 h-full w-full relative outline-none text-white border-0 pt-6"
                placeholder="Write your markdown here"
              />
            ) : (
              // preview window
              <div className="bg-slate-900 h-full w-full text-white"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
