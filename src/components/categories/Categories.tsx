import React, { useState } from "react";
import {
  AddCategory,
  AddCategoryContainer,
  ButtonCancel,
  ButtonPush,
  Buttons,
  CategoriesConteiner,
  H2,
} from "./CategoriesStyles";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { CategoriesContainer } from "./CategoriesContainer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AuthContext } from "../../providers/auth";
import { postCategory } from "../../services/UserServices";
export const Categories = () => {
  const [value, setValue] = useState("");
  const { showAddButton, setShowAddButton } = React.useContext(
    AuthContext
  ) as any;
  const listCategories = [
    { id: 1, title: "Links de Noticias" },
    { id: 2, title: "Links de Favoritos" },
    { id: 3, title: "Links Mais Acessados" },
    { id: 4, title: "Ultimos Adicionados" },
    { id: 5, title: "Blogs" },
    { id: 6, title: "Todos os Links" },
  ];
  const [show, setShow] = useState({
    width: "70px",
    color: "transparent",
    content: "center",
    font: "9px",
    display: "none",
    top: "140px",
    right: "0",
    position: "absolute",
    padding: "45px 10px 20px 10px",
  });

  function handleNextMouseLeave() {
    setShow({
      width: "250px",
      color: "null",
      content: "space-between",
      font: "15px",
      display: "block",
      top: "140px",
      right: "0",
      position: "absolute",
      padding: "45px 10px 20px 10px",
    });
  }

  function handlePrevMouseLeave() {
    setShow({
      width: "70px",
      color: "transparent",
      content: "center",
      font: "9px",
      display: "none",
      top: "140px",
      right: "0",
      position: "absolute",
      padding: "45px 10px 20px 10px",
    });
  }
  function addCategory() {
    setShowAddButton(true);
    localStorage.removeItem("check");
  }
  function handleForm(e: any) {
    e.preventDefault();
    setValue("");
  }
  function pushCategory() {
   
    const categories = postCategory(value);
    categories
      .then((response) => {
        console.log(response.data);
        setValue("");
        setShowAddButton(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        alert(error.response.status);
      });
  }
  const buttonDisabled = value === "" ? true : false;
  return (
    <>
      <CategoriesConteiner type={show} onMouseEnter={handleNextMouseLeave}>
        <div>
          <DoubleArrowIcon
            onClick={handlePrevMouseLeave}
            className="arrowIcon"
          />
          Categories
        </div>
        {listCategories.map((category) => (
          <CategoriesContainer
            category={category.title}
            categoryId={category.id}
          />
        ))}

        <AddCategoryContainer selectCategory={"transparent"}>
          {!showAddButton ? (
            <AddCategory
              selectCategory={"rgba(0, 0, 0, 0.782)"}
              onClick={addCategory}
            >
              <AddCircleIcon style={{ fontSize: "30px" }} />
            </AddCategory>
          ) : (
            <form onSubmit={handleForm}>
              <input
                type="text"
                minLength={5}
                placeholder="digite sua categoria"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <Buttons>
                <ButtonCancel
                  showButton={buttonDisabled}
                  onClick={() => setShowAddButton(false)}
                >
                  canelar
                </ButtonCancel>
                <ButtonPush
                  showButton={buttonDisabled}
                  onClick={pushCategory}
                  type="submit"
                  disabled={buttonDisabled}
                >
                  enviar
                </ButtonPush>
              </Buttons>
            </form>
          )}
        </AddCategoryContainer>
      </CategoriesConteiner>
    </>
  );
};
