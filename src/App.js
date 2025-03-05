import { useState } from "react";
import "./App.css";
import json from "./Data.json";

const List = ({ list, addNodeToTree, deleteNode }) => {
  const [isExpanded, setIsExpanded] = useState({});
  return list.map((item) => {
    return (
      <div className="container">
        {item.isFolder && (
          <span
            onClick={() =>
              setIsExpanded((prev) => ({
                ...prev,
                [item.name]: !prev[item.name],
              }))
            }
          >
            {isExpanded[item.name] ? "-" : "+"}
          </span>
        )}
        <span>{item.name}</span>
        <span onClick={() => addNodeToTree(item.id)}>
          <img
            className="add"
            src="https://www.shutterstock.com/image-vector/new-folder-file-add-attach-600nw-1033746835.jpg"
            alt="add"
          />
        </span>
        <span onClick={()=> deleteNode(item.id)}>
          <img
            className="add"
            src="https://png.pngtree.com/png-vector/20220926/ourmid/pngtree-delete-button-3d-icon-png-image_6217492.png"
            alt="delete"
          />
        </span>
        {item?.children && isExpanded?.[item.name] && (
          <List list={item.children} addNodeToTree={addNodeToTree} deleteNode={deleteNode}/>
        )}
      </div>
    );
  });
};

function App() {
  const addNodeToTree = (parentId) => {
    const name = prompt("enter the name of folder");
    const updateTree = (list) => {
      return list.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [
              ...item.children,
              {
                id: "123",
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (item.children) {
          return { ...item, children: updateTree(item.children) };
        }
        return item;
      });
    };
    setData((prev) => updateTree(prev));
  };

  const deleteNode = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((item) => item.id !== itemId)
        .map((node) => {
          if (node.children) {
            return {
              ...node,
              children: updateTree(node.children),
            };
          }
          return node;
        });
    };
    setData((prev) => updateTree(prev));
  };

  const [data, setData] = useState(json);
  return (
    <>
      <div>File explorer</div>
      <List list={data} addNodeToTree={addNodeToTree} deleteNode={deleteNode}/>
    </>
  );
}

export default App;
