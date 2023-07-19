import React, { memo } from "react";
import { useCurrentRoom } from "../../../context/current-room.context";
import { Link } from "react-router-dom";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { useMediaQuery } from "../../../misc/customHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonToolbar } from "rsuite";
import RoomInfoBtnModal from "./RoomInfoBtnModal";

const Top = () => {
  const name = useCurrentRoom((value) => value.name);
  const isMobile = useMediaQuery("(max-width:992px)");

  return (
    <div>
  
      <div className="d-flex justify-content-between align-items-center">
        <h4  className="text-disappear display-flex align-items-center " >
          <Link to="/" className="link-unstyled">
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              size="sm"
              className={
                isMobile
                  ? "d-inline-block p-0 mr-2 text-yellow link-unstyled"
                  : "d-none"
              }
            />
          </Link>
         
          <span className="text-disappear">{name}</span>
        </h4>

        
        {/* <ButtonToolbar >Todo</ButtonToolbar> */}
        <Button className="flex-nowrap" >todo</Button>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span> todo </span>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};

export default memo(Top);
