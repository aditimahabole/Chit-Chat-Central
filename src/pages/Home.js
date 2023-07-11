import React from 'react'
import { Grid, Row ,Col} from 'rsuite';
import SideBar from '../components/SideBar';


const Home = () => {
  return (
    <Grid fluid className='h-100'>
    <Row>
    <Col xs={24} md={8} >
      <SideBar />
      hello home
    </Col>
    </Row>

    </Grid>
  )
}

export default Home