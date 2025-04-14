import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Modal,
  Button,
} from "react-bootstrap";
import { BsFillXSquareFill } from "react-icons/bs";
import { deleteProduct, initProduct } from "../features/list/listSlice";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* --global state starts--  */

  /*  -- global state starts --  */
  const list = useSelector((state) => state.list).data;
  const { product } = useSelector((state) => state.list);
  // optional step to get current product from url param
  if (!product.id) dispatch(initProduct(list[0].id));
  /* --global state ends--  */

  /* --local state starts--  */
  const [modalShow, setModalShow] = React.useState(false);
  /* --local state ends--  */

  /* --handlers starts--  */
  const handlerDeleteBtn = (event, _id) => {
    event.stopPropagation();
    dispatch(initProduct(_id));
    setModalShow(true);
  };
  const handlerDeleteConfirm = (event) => {
    setModalShow(false);
    dispatch(deleteProduct(product.id));
  };
  const handlerClickItem = (event, _id) => {
    navigate(`products/${_id}`);
  };
  /* --handlers ends--  */

  /* --sub-components starts--  */
  const List = list.map((listItem, index) => {
    return (
      <Col key={listItem.id} className="mb-4" xs={12} sm={8} md={6} lg={4}>
        <Card
          bg="secondary"
          className="p-1 bg-light border-2 w-100 cursor-pointer"
          onClick={(e) => handlerClickItem(e, listItem.id)}
        >
          <BsFillXSquareFill
            className="position-absolute text-danger my-1 mx-2 pe-auto fs-2 end-0 cursor-pointer delete-btn color-danger"
            onClick={(e) => handlerDeleteBtn(e, listItem.id)}
          />
          <Card.Img
            variant="top"
            src={listItem.imageUrl}
            thumbnail="holder.js/100px250"
            className="user-select-none list-item-image w-100 bg-dark"
          />
          <ListGroup variant="flush" className="w-100 user-select-none">
            <ListGroup.Item>Name: {listItem.name}</ListGroup.Item>
            <ListGroup.Item>Number of goods: {listItem.count}</ListGroup.Item>
            <ListGroup.Item>
              Size: {listItem.size.width}x{listItem.size.height}
            </ListGroup.Item>
            <ListGroup.Item>Weight: {listItem.weight}</ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    );
  });

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal confirmation window
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to delete this item?</h4>
          {!!product.id ? (
            <Card bg="success" className="p-1 bg-primary w-100">
              <Card.Img
                variant="top"
                src={product.imageUrl}
                thumbnail="holder.js/100px250"
                className="user-select-none"
              />
              <ListGroup variant="flush" className="w-100 user-select-none">
                <ListGroup.Item>Name: {product.name}</ListGroup.Item>
                <ListGroup.Item>
                  Number of goods: {product.count}
                </ListGroup.Item>
                <ListGroup.Item>
                  Size: {product.size.width}x{product.size.height}
                </ListGroup.Item>
                <ListGroup.Item>Weight: {product.weight}</ListGroup.Item>
              </ListGroup>
            </Card>
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={(e) => handlerDeleteConfirm(e)}>
            Delete
          </Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  /* --sub-components ends--  */

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Container className="mt-4">
        <Row className="justify-content-center">{List}</Row>
      </Container>
    </>
  );
}

export default ProductList;
