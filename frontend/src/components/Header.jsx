import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Header = () => (
  <header>
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Row>
          <Col>
            <Link className="navbar-brand" to="/">Chat</Link>
          </Col>
        </Row>
      </div>
    </nav>
  </header>
);

export default Header;
