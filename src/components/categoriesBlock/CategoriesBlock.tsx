"use client";
import "./categoriesBlock.css";
// import categories from "../../app/test/categoriesTest.json";
import { useState } from "react";
import { CategoriesInterface } from "@/interfaces/categories";

interface ChildProps {
  setDisplayCategories: React.Dispatch<React.SetStateAction<boolean>>;
  setCateLabel: React.Dispatch<
    React.SetStateAction<CategoriesInterface | null>
  >;
  categories: CategoriesInterface[] | null;
}

const CategoriesBlock: React.FC<ChildProps> = ({
  setDisplayCategories,
  categories,
  setCateLabel,
}) => {
  const [childrenCate, setChildrenCate] = useState<
    CategoriesInterface[] | null
  >(null);

  const [grandChildren, setGrandChildren] = useState<
    CategoriesInterface[] | null
  >(null);

  const handleGetChildren = (id: string | null): void => {
    if (categories) {
      setChildrenCate(categories.filter((c) => c.parentId === id));
    }
  };

  const handleGetGrandChildren = (id: string | null): void => {
    if (categories) {
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
          {categories &&
            categories
              .filter((c) => c.parentId === null)
              .map((c) => (
                <li
                  key={c.id}
                  onMouseEnter={() => {
                    handleGetChildren(c.id);
                    setGrandChildren(null);
                  }}
                  onClick={() => setCateLabel(c)}
                >
                  {c.name}
                  <i className="fa-solid fa-angle-right"></i>
                </li>
              ))}
        </ul>
      </div>

      {childrenCate && (
        <div className="main-container categories__block categories__block--children">
          <ul>
            {childrenCate.map((c) => (
              <li
                key={c.id}
                onMouseEnter={() => handleGetGrandChildren(c.id)}
                onClick={() => setCateLabel(c)}
              >
                {c.name}
                <i className="fa-solid fa-angle-right"></i>
              </li>
            ))}
          </ul>
        </div>
      )}
      {grandChildren && (
        <div className="main-container categories__block categories__block--children">
          <ul>
            {grandChildren.map((c) => (
              <li key={c.id} onClick={() => setCateLabel(c)}>
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
