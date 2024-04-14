import { Alert } from "react-bootstrap";

const Footer = () => {
  return (
    <Alert variant="success">
      <Alert.Heading>PC-MARKET &copy; 2024</Alert.Heading>
      <p>
        PC-Market là điểm đến lý tưởng cho những ai đam mê công nghệ và muốn tìm
        kiếm những sản phẩm máy tính chất lượng và đa dạng. Với một loạt các sản
        phẩm từ các thương hiệu hàng đầu, từ máy tính để bàn đến laptop và phụ
        kiện, PC-Market cam kết mang đến trải nghiệm mua sắm thuận tiện và đáng
        tin cậy. Khám phá ngay để tìm kiếm sự hoàn hảo cho nhu cầu công nghệ của
        bạn!
      </p>
      <hr />
      <p className="mb-0">Nguyễn Văn Nghĩa</p>
    </Alert>
  );
};

export default Footer;
