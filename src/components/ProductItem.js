import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormTemplate from "./FormTemplate";
import { BsFillXSquareFill } from "react-icons/bs";
import {
  initProduct,
  deleteProduct,
  addProductComment,
  deleteProductComment,
} from "../features/list/listSlice";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Modal,
  Image,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";

function ProductItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();

  /*  -- global state starts --  */
  const { product } = useSelector((state) => state.list);
  // optional step to get current product from url param
  if (+id !== product.id) dispatch(initProduct(+id));
  /*  -- global state ends --  */

  /*  -- local state starts --  */
  const [validatedComment, setValidatedComment] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [isEdited, setIsEdited] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  /*  -- local state ends --  */

  /*  -- handlers starts --  */
  const handlerComment = (event) => {
    const { value } = event.target;
    setComment(value);
    return !!value && value.length > 0
      ? setValidatedComment(true)
      : setValidatedComment(false);
  };

  const handlerAddComment = (event) => {
    dispatch(addProductComment(comment));
    setTimeout(() => {
      setComment("");
      setValidatedComment(false);
    }, 200);
  };

  const handlerClickHome = (event) => {
    navigate(`/`);
  };
  const handlerDeleteBtn = (event) => {
    setShowModal(false);
    dispatch(deleteProduct());
    navigate(`/`);
  };
  const handlerDeleteComment = (event, _id) => {
    dispatch(deleteProductComment(_id));
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  /*  -- handlers ends --  */

  /*  -- sub-components starts --  */
  const Comments = product.comments.map((comment) => {
    return (
      <ListGroup.Item
        key={comment.id}
        variant="dark"
        className="rounded-0 border-0 border-top border-dark border-1"
      >
        {comment.description}
        <span className="float-end pl-2">{comment.date}</span>
      </ListGroup.Item>
    );
  });

  const ModalDeleteConfirm = () => {
    return (
      <Modal show={showModal} onHide={() => handleCloseModal} animation={false}>
        <Modal.Body>Are you sure to delete product {product.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handlerDeleteBtn}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const ProductInfoCard = () => {
    return (
      <Card bg="light">
        <div className="d-flex flex-column flex-xl-row" id="products-item-info">
          <Image
            src={product.imageUrl}
            thumbnail="holder.js/100px250"
            className="user-select-none m-0 mt-3 mx-auto border-0 rounded-top product-image list-item-image bg-secondary"
          />
          <ListGroup variant="flush" className="m-0 overflow-hidden">
            <ListGroup.Item className="bg-transparent">
              Product ID: {product.id}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent">
              Name: {product.name}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent">
              Image url: {product.imageUrl}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent">
              Number of goods: {product.count}
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent">
              Size: {product.size.width}x{product.size.height}
              <span className="px-2 py-0">(width x height)</span>
            </ListGroup.Item>
            <ListGroup.Item className="bg-transparent">
              Weight: {product.weight}
            </ListGroup.Item>
          </ListGroup>
        </div>
        <ListGroup>
          <ListGroup.Item className="border-0 border-top border-dark border-2 rounded-0 bg-transparent"></ListGroup.Item>
          {Comments}
        </ListGroup>
        <Card.Body>
          <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              className="mt-4"
              isInvalid={!validatedComment}
              value={comment}
              onChange={(e) => handlerComment(e)}
            />
            <Form.Control.Feedback type="invalid">
              Please type something.
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            id="products-item-add-comment-btn"
            className="my-3 mx-2"
            type="button"
            variant="outline-primary"
            disabled={!validatedComment}
            onClick={(e) => handlerAddComment(e)}
          >
            Add comment
          </Button>
          <Button
            id="products-item-delete-btn"
            className="my-3 mx-2 float-end"
            type="button"
            variant="outline-danger"
            onClick={handleShowModal}
          >
            Delete
          </Button>
          <Button
            id="products-item-edit-btn"
            className="my-3 mx-2  float-end"
            type="button"
            variant="outline-primary"
            onClick={() => setIsEdited(!isEdited)}
          >
            Edit product
          </Button>
          <Button
            id="products-item-home-btn"
            className="m-2 mt-0 d-block"
            type="button"
            variant="link"
            onClick={() => handlerClickHome()}
          >
            Back to main list
          </Button>
        </Card.Body>
      </Card>
    );
  };
  const formProps = {
    isEdit: true,
  };

  const CommentsEditForm = () => {
    return (
      <ListGroup>
        {product.comments.map((comment) => {
          return (
            <ListGroup.Item
              key={comment.id}
              variant="light"
              className="rounded-0 border-0 border-top border-dark border-1 text-dark fs-5 align-bottom"
            >
              {comment.description}

              <BsFillXSquareFill
                className="float-end ml-2 fs-2 cursor-pointer text-danger delete-btn"
                onClick={(e) => handlerDeleteComment(e, comment.id)}
              />
              <span className="float-end px-2">{comment.date}</span>
              {/* <BsFillBrushFill className="float-end ml-2 fs-2" />  */}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  };

  const ProductEditForm = () => {
    return (
      <Card>
        {<FormTemplate {...formProps} />}
        <Card.Body>
          <Button
            id="products-item-save-edit-btn"
            className="my-3 mx-2"
            type="submit"
            form="product-item-form"
            variant="primary"
          >
            Save new data
          </Button>
          <Button
            id="products-item-cancel-edit-btn"
            className="my-3 mx-2"
            type="button"
            variant="secondary"
            onClick={() => setIsEdited(!isEdited)}
          >
            Discard changes
          </Button>
        </Card.Body>
        {CommentsEditForm()}
      </Card>
    );
  };

  /*  -- sub-components ends --  */

  return (
    <>
      {ModalDeleteConfirm()}
      <Container fluid>
        <Row className="justify-content-center">
          <Col
            sm={8}
            md={6}
            className="mt-4 position-relative overflow-hidden"
            style={{ boxSizing: "content-box" }}
          >
            {isEdited ? ProductEditForm() : ProductInfoCard()}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductItem;
