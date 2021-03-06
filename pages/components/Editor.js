import { React, useState, useEffect } from "react";
import Nav from "./Nav";
import FileList from "./FileList";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";

const Editor = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [stories, getStories] = useState([]);
  const [displayWindow, setDisplayWindow] = useState(false);
  const [currentFile, setCurrentFile] = useState("");
  const [newFile, setNewFile] = useState("");
  const [callback, setCallback] = useState("");
  const accessToken = "";
  const oauth = "";
  // Initialize the client with the oauth token
 storyblokInit({
    accessToken: oauth,
    use: [apiPlugin],
  });

  const storyblokApi = getStoryblokApi();

  useEffect(() => {
    storyblokApi.get("cdn/stories", {})
      .then((response) => {
        getStories(response.data.stories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [callback]);

  const createStory = async () => {
    await fetch("https://mapi.storyblok.com/v1/spaces/155304/stories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        story: {
          name: newFile,
          slug: newFile.replace(/ /g, ""),
          content: {
            component: "Markdown",
            title: newFile,
            markdonwns: "",
          },
        },
        publish: 1,
      }),
    }).then((response) => {
      // console.log(response);
      setCallback(response);
    });
    setDisplayWindow(false);
    setNewFile("");
    setValue("");
    setCurrentFile("");
  };

  const handleChange = (e) => {
    setNewFile(e.target.value);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const setFile = (dat) => {
    setDisplayWindow(dat);
  };

  const getFileData = (dat) => {
    setValue(dat.content.markdonwns);
    setCurrentFile(dat);
  };

  const handleSave = async (dat) => {
    await fetch(`https://mapi.storyblok.com/v1/spaces/155304/stories/${dat.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        story: {
          name: dat.name,
          slug: dat.slug,
          id: dat.id,
          content: {
            component: "Markdown",
            title: dat.content.title,
            markdonwns: value,
          },
        },
        publish: 1,
      }),
    }).then((response) => {
      // console.log(response);
      setCallback(response);
    });
  };

  const handleDelete = async (dat) => {
    await fetch(`https://mapi.storyblok.com/v1/spaces/155304/stories/${dat.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }).then((response) => {
      // console.log(response);
      setCallback(response);
    }
    );
  }



  const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.
A block quote with ~strikethrough~ and a URL: https://reactjs.org.
A block quote with ~strikethrough~ and a URL: https://reactjs.org. [apple](https://apple.com).

## hekko
# This ~is not~ strikethrough, but ~~this is~~!

* Lists
* [ ] todo
* [x] done

A table:

| head | tail   | mid  |
| ---- | ------ | ---- |
|      |        | yam  |
| app  | cheese | milk |
| rice | a      | b    |


`;
  return (
    <>
      <Nav display={setFile} current={currentFile} save={handleSave} Delete={handleDelete} />
      <div className="relative bg-slate-900">
        <div className="relative h-full flex flex-row pt-28">
          <FileList returndata={getFileData} list={stories} />
          <div className=" w-3/4 border border-slate-900 py-8 px-8">
            <button
              className="cursor-pointer relative text-blue-500 font-semibold text-md"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? "Edit" : "Preview"}
            </button>
            {!show ? (
              // text area to type markdown
              <textarea
                className=" bg-slate-900 fullheight w-full relative outline-none text-white border-0 pt-6"
                placeholder="Write your markdown here"
                value={value}
                onChange={handleInputChange}
              />
            ) : (
              // preview window
              <div className="bg-slate-900 h-full w-full text-white editor">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, "")}
                          style={atomDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {value}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
        {/* new file creation window */}
        {displayWindow ? (
          <div className=" absolute h-full w-full flex justify-center items-center top-0 backdrop-blur-lg">
            <div className="bg-blue-500 rounded-lg p-4">
              <div className="flex flex-col justify-center items-center gap-8">
                <div className=" relative w-full flex flex-row justify-between">
                  <h1 className=" font-medium uppercase text-white">
                    Create a New File
                  </h1>
                  <button
                    onClick={() => {
                      setDisplayWindow(false);
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="flex flex-row gap-2 justify-center items-center">
                  <div className="flex-1">
                    <input
                      className=" rounded-lg p-4 text-black"
                      type="text"
                      placeholder="File name"
                      value={newFile}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-1">
                    <button
                      className="text-white bg-slate-900 px-4 py-3 rounded-md"
                      onClick={() => {
                        createStory();
                      }}
                    >
                      Create File
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Editor;
