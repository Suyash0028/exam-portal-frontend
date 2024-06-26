import { Spinner } from "react-bootstrap";
export default function CustomSpinner() {
  return (
    <div className="p-5 d-flex align-items-center justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}