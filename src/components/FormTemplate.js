import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewProduct, setProduct } from "../features/list/listSlice";
import { Row, Col, Form } from "react-bootstrap";

function FormTemplate(props = { isEdit: false }) {
  const dispatch = useDispatch();

  /*  -- global state starts --  */
  const { product } = useSelector((state) => state.list);
  /*  -- global state ends --  */

  /*  -- local state starts --  */
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState(props.isEdit ? product.name : "random"),
    onInputName = ({ target: { value } }) => setName(value);
  const [url, setUrl] = useState(
      props.isEdit ? product.imageUrl : "https://via.placeholder.com/150"
    ),
    onInputUrl = ({ target: { value } }) => setUrl(value);
  const [number, setNumber] = useState(props.isEdit ? product.count : 0),
    onInputNumber = ({ target: { value } }) => setNumber(+value);
  const [width, setWidth] = useState(props.isEdit ? product.size.width : 0),
    onInputWidth = ({ target: { value } }) => setWidth(+value);
  const [height, setHeight] = useState(props.isEdit ? product.size.height : 0),
    onInputHeight = ({ target: { value } }) => setHeight(+value);
  const [weight, setWeight] = useState(props.isEdit ? product.weight : 0),
    onInputWeight = ({ target: { value } }) => setWeight(value);
  /*  -- local state ends --  */

  /*  -- handlers starts --  */
  const setList = () =>
    dispatch(
      addNewProduct({
        name,
        imageUrl: url,
        count: number,
        size: {
          width,
          height,
        },
        weight,
      })
    );

  const setItem = () =>
    dispatch(
      setProduct({
        id: product.id,
        name,
        imageUrl: url,
        count: number,
        size: {
          width,
          height,
        },
        weight,
        comments: product.comments,
      })
    );

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      props.isEdit ? setItem() : setList();
    }
    setValidated(true);
  };
  /*  -- handlers ends --  */

  return (
    <Form
      id="product-item-form"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className={props.isEdit ? "px-5 pt-4" : "px-5 pb-5"}
    >
      <Row className={props.isEdit ? "" : "mb-3"}>
        <Form.Group
          as={Col}
          md={props.isEdit ? 10 : 6}
          controlId="validationName"
        >
          <Form.Label>Name: </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Item name"
            pattern="^[^\s]*[A-Za-z\s]{3,}"
            onChange={(e) => onInputName(e)}
            value={name}
          />
          <Form.Control.Feedback type="invalid">
            Please use letters only. Don't let this field empty.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          Please choose a name using only letter. Don't let this field empty.
        </Form.Control.Feedback>
        <Form.Group
          as={Col}
          md={props.isEdit ? 10 : 6}
          controlId="validationUrl"
        >
          <Form.Label>Image url: </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="https://"
            onChange={(e) => onInputUrl(e)}
            value={url}
          />
          <Form.Control.Feedback type="invalid">
            Don't let this field empty.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md={props.isEdit ? 10 : 3}
          controlId="validationNumber"
        >
          <Form.Label>Number of goods: </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Number of items"
            pattern="^[1-9]+[0-9]*"
            onChange={(e) => onInputNumber(e)}
            value={number}
          />
          <Form.Control.Feedback type="invalid">
            Please choose a number of items. Don't start from zero and let this
            field empty.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md={props.isEdit ? 10 : 3}
          controlId="validationWidth"
        >
          <Form.Label>Item width: </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="width"
            pattern="^[1-9]+[0-9]*"
            onChange={(e) => onInputWidth(e)}
            value={width}
          />
          <Form.Control.Feedback type="invalid">
            Please choose a width. Don't start from zero and let this field
            empty.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md={props.isEdit ? 10 : 3}
          controlId="validationHeight"
        >
          <Form.Label>Item height: </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="height"
            pattern="^[1-9]+[0-9]*"
            onChange={(e) => onInputHeight(e)}
            value={height}
          />
          <Form.Control.Feedback type="invalid">
            Please choose a height. Don't start from zero and let this field
            empty.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md={props.isEdit ? 10 : 3}
          controlId="validationWeight"
        >
          <Form.Label>Item weight: </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="weight"
            pattern="^[1-9]+[0-9a-zA-Z]*"
            onChange={(e) => onInputWeight(e)}
            value={weight}
          />
          <Form.Control.Feedback type="invalid">
            Please choose a weight. Don't start from zero and let this field
            empty.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </Form>
  );
}

export default FormTemplate;
