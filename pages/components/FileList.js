import React from "react";

const FileList = ({list, returndata}) => {
  return (
    <div className=" relative w-1/4 bg-slate-700 h-screen pt-8 pl-6">
      <div className=" text-white">
        <span className=" uppercase text-slate-400 font-medium">
          <h2>Files</h2>
          <hr className=" bg-white w-3/4 mt-2" />
          {list && list.map((file, index) => {
            return (
              <div key={index} className=" my-2 hover:cursor-pointer hover:bg-slate-900 px-2 py-1">
                <div>
                  <span className="text-white" onClick={()=>{
                    returndata(file)
                  }}>{file.name}</span>
                </div>
            </div>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default FileList;
