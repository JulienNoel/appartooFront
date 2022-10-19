import { useState, useEffect } from "react";
import { role } from "../data/roleData";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import RoleCard from "./roleCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { listItemSecondaryActionClasses } from "@mui/material";

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

function RoleColumn({ token, roleUser }) {
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState("");
  const [error, setError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    updateRole();
    setOpen(false);
  };
  
  useEffect(()=>{

    if(roleUser) {
      const dataRole = role.filter((el) => el.role === roleUser)
      
      setIsSelected(dataRole[0])
    }

  },[])
  

  async function updateRole() {
    const response = await fetch("/updaterole", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${token}&role=${isSelected?.role}`,
    });

    const rawResponse = response.json();

    !rawResponse ? setError(true) : setError(false);
  }

  return (
    <div className="role-ami-column">
      <h2>Mon role</h2>
      {!isSelected ? (
        <p>Schtroumpfez un role sinon j'envoie Gargamel</p>
      ) : (
        <RoleCard
          role={isSelected?.role}
          img={isSelected?.img}
          noHover={true}
        />
      )}
      {!error || (
        <Stack sx={{ width: 280 }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
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
                  <div
                    onClick={() =>
                      setIsSelected({ role: el.role, img: el.img })
                    }
                    key={el.img}
                  >
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
  );
}

export default RoleColumn;
