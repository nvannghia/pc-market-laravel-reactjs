import { Toast } from "react-bootstrap";

const ToastsError = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto" style={{ color: "red" }}>
            Unauthorized !
          </strong>
          <small>Now</small>
        </Toast.Header>
        <Toast.Body style={{ color: "red" }}>
          Bạn không có quyền truy cập vào trang này!
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastsError;
