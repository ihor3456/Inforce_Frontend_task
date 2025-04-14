import React, { useState } from "react";
import { Collapse, Button } from "react-bootstrap";

import FormTemplate from "./FormTemplate";

function ProductForm() {
  const [open, setOpen] = useState(false);
  const resetBtnHandler = () => {
    setOpen(!open);
  };
  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="collapse-add-item-form"
        aria-expanded={open}
        variant="success"
        className="m-3 ml-auto"
        size="lg"
      >
        +Add new item
      </Button>
      <Collapse in={open}>
        <div>
          {<FormTemplate />}
          <Button type="submit" form="product-item-form" className="mx-3">
            Submit form
          </Button>
          <Button
            type="button"
            onClick={resetBtnHandler}
            variant="danger"
            className="mx-3"
          >
            Cansel
          </Button>
        </div>
      </Collapse>
    </>
  );
}

export default ProductForm;
