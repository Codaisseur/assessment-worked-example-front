import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import { selectToken, selectIsArtist } from "../../store/user/selectors";
import { postArtwork } from "../../store/artworkDetails/actions";

export default function StartAuction() {
  const isArtist = useSelector(selectIsArtist);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [minimumBid, setMinimumBid] = useState("0");
  const [imageUrl, setImageUrl] = useState("");

  function submitForm(event) {
    dispatch(postArtwork(title, imageUrl, minimumBid));
    setTitle("");
    setMinimumBid("0");
    setImageUrl("");
  }

  if (!token || !isArtist) {
    return <div>You need to be a logged in as an artist to access this page</div>;
  }
  return (
    <Jumbotron
      style={{
        border: "solid",
      }}
    >
      <Form as={Col} md={{ span: 6, offset: 3 }}>
        <h1 className="mt-5 mb-5">
          Post one of your artworks to start receiving offers
        </h1>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Enter a Title"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicImageUrl">
          <Form.Label>Image url</Form.Label>
          <Form.Control
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            type="text"
            placeholder="Enter an Image url"
            required
          />
          {imageUrl && (
            <Col className="mt-4" md={{ span: 8, offset: 2 }}>
              <Image src={imageUrl} alt="preview" thumbnail />
            </Col>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Minimum Bid ($)</Form.Label>
          <Form.Control
            value={minimumBid}
            onChange={(event) => setMinimumBid(event.target.value)}
            type="number"
            required
          />
        </Form.Group>

        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Start Auction
          </Button>
        </Form.Group>
      </Form>
    </Jumbotron>
  );
}
