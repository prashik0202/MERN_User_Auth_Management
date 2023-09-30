import { Container , Card , Button  } from "react-bootstrap";

const Hero = () => {
  return(
    <div className="py-5">
      <Container className='d-flex justify-content-center'>
        <Container className='p-5 d-flex flex-column align-items-center bg-light w-60'>
          <h1 className='text-center mb-4'>MERN Authentication</h1>
          <h5 className='text-center mb-4'>
            This is MERN authentication that stores a JWT in
            an HTTP-Only cookie.<br/> It also uses Redux Toolkit and the React
            Bootstrap library.
          </h5>
          <div className='d-flex'>
            <Button variant='outline-primary' href='/login' className='me-3'>
              Sign In
            </Button>
            <Button variant='outline-success' href='/register'>
              Register
            </Button>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default Hero;