"use client";
import "./categoriesBlock.css";
import categories from "../../app/test/categoriesTest.json";
import { useState } from "react";

interface ChildProps {
  setDisplayCategories: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoriesBlock: React.FC<ChildProps> = ({ setDisplayCategories }) => {
  const [childrenCate, setChildrenCate] = useState<
    {
      _id: string;
      name: string;
      slug: string;
      parentId: string | null;
    }[]
  >([]);

  const [grandChildren, setGrandChildren] = useState<
    {
      _id: string;
      name: string;
      slug: string;
      parentId: string | null;
    }[]
  >([]);

  const handleGetChildren = (id: string | null): void => {
    if (categories.length !== 0) {
      setChildrenCate(categories.filter((c) => c.parentId === id));
    }
  };

  const handleGetGrandChildren = (id: string): void => {
    if (categories.length !== 0) {
      setGrandChildren(categories.filter((c) => c.parentId === id));
    }
  };

  return (
    <div
      className="categories__block--wrap"
      onMouseLeave={() => {
        setChildrenCate([]);
        setGrandChildren([]);
        setDisplayCategories(false);
      }}
    >
      <div className="main-container categories__block">
        <ul>
          {categories?.length !== 0 &&
            categories
              .filter((c) => c.parentId === null)
              .map((c) => (
                <li
                  key={c._id}
                  onMouseEnter={() => {
                    handleGetChildren(c._id);
                    setGrandChildren([]);
                  }}
                >
                  {c.name}
                  <i className="fa-solid fa-angle-right"></i>
                </li>
              ))}
        </ul>
      </div>

      {childrenCate.length !== 0 && (
        <div className="main-container categories__block categories__block--children">
          <ul>
            {childrenCate.map((c) => (
              <li
                key={c._id}
                onMouseEnter={() => handleGetGrandChildren(c._id)}
              >
                {c.name}
                <i className="fa-solid fa-angle-right"></i>
              </li>
            ))}
          </ul>
        </div>
      )}
      {grandChildren.length !== 0 && (
        <div className="main-container categories__block categories__block--children">
          <ul>
            {grandChildren.map((c) => (
              <li key={c._id}>
                {c.name}
                <i className="fa-solid fa-angle-right"></i>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoriesBlock;
