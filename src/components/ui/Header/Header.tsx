import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cls from './Header.module.scss';

function Header() {
  return (
    <header className={cls.navbar}>
      <Navbar bg='light' expand='lg'>
        <Container>
          {/* <Navbar.Brand>Pages:</Navbar.Brand> */}
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} href='/'>
                Домой
              </Nav.Link>
              <Nav.Link as={Link} href='/create'>
                Создание
              </Nav.Link>
              {/* <Nav.Link as={Link} href='/update/1'>
                Update
              </Nav.Link> */}
              {/* <Nav.Link as={Link} href='/delete/1'>
                Delete
              </Nav.Link> */}
              <Nav.Link as={Link} href='/view'>
                Просмотр
              </Nav.Link>
              <Nav.Link as={Link} href='/search'>
                Поиск
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export { Header };
