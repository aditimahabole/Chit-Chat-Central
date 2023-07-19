import React  from "react";
import { Grid, Row, Col } from "rsuite";
import SideBar from "../../components/SideBar";
import { RoomsProvider } from "../../context/rooms.context";
import { Switch, Route , useRouteMatch } from "react-router-dom";
import Chat from "./Chat";
import { useMediaQuery } from "../../misc/customHook";

const Home = () => {
  const isDesktop = useMediaQuery('(min-width:992px)')
  const {isExact} = useRouteMatch();
  const canShowSidebar = isDesktop || isExact
  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">

         { canShowSidebar &&
           <Col xs={24} md={8} className="h-100">
            <SideBar />
            hello home
          </Col>}
          <Switch>
            <Route exact path="/chat/:chatId">
              <Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>
            <Route>
              {isDesktop && <Col xs={24} md={16} className="h-100">
              <h6 className="text-center mt-page" > Please select chat </h6>

              </Col> }
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
