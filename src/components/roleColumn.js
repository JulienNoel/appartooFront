import { useState, useEffect } from "react";
import { role } from "../data/roleData";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import RoleCard from "./roleCard";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    height: "50vh",
    bgcolor: "white",    
    boxShadow: 24,
  };

function RoleColumn() {

    
    const [open, setOpen] = useState(false);
    const [isSelected, setIsSelected] = useState("");
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
  


    return(
        <div className="role-ami-column">
        <h2>Mon role</h2>
        {isSelected === "" ? (
          <p>Schtroumpfez un role sinon j'envoie Gargamel</p>
        ) : (
          <RoleCard
            role={isSelected?.role}
            img={isSelected?.img}
            noHover={true}
          />
        )}

        <Button
          sx={{ width: 250, marginBottom: 5 }}
          variant="contained"
          onClick={handleOpen}
        >
          Schtroumpfer Mon Role
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="box-modal">
              <div className="display-role">
                {role.map((el) => {
                  return (
                    <div onClick={() => setIsSelected({ role: el.role, img: el.img })} key={el.img}>
                      <RoleCard
                        role={el.role}
                        img={el.img}
                        noHover={false}                        
                        selectionChange={isSelected}
                      />
                    </div>
                  );
                })}
              </div>
              <Button
                sx={{ width: 300, marginTop: 5 }}
                variant="contained"
                onClick={handleClose}
              >
                J'ai Schtroumpfer
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    )
}

export default RoleColumn