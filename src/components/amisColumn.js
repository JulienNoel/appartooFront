import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import RoleCard from "./roleCard";
import { role } from "../data/roleData";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "33vw",
  height: "66vh",
  bgcolor: "white",
  boxShadow: 24,
};

function AmisColumn() {
  const [dataList, setDataList] = useState([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0)
  const [friendList, setFriendList] = useState([])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function loadFriends() {
      const response = await fetch("http://localhost:3000/addfriend");
      const rawResponse = await response.json();
      if (response) {
        setDataList(rawResponse.result);
      }
    }
    loadFriends();
  }, []);

  useEffect(() =>{

    async function updateFriends() {

    }
    updateFriends()

  },[])


  function addFriend() {
    const addToList = {name: role[count]?.role, img: role[count]?.img}
    setFriendList([...friendList, addToList])
    handleClose()

  }

  function removeFriend(friend){
    const newFriendList = friendList.filter(el => el.img !== friend.img)
    setFriendList(newFriendList)

  }
  console.log(friendList)

count < 0 && setCount(role.length)
count > role.length-1 && setCount(0)



  return (
    <div className="role-ami-column">
      <h2>Mes Amis</h2>
      {friendList.map((el) => {
        return <FriendCard name={el.name} img={el.img} key={el.img} removeFriend={removeFriend}/>
      })}
      
      <div>
        <Button
          onClick={handleOpen}
          sx={{ width: 250, marginBottom: 5 }}
          variant="contained"
        >
          Schtroumpfer un Ami
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="box-modal">
              <div className='display-friend-card'>
                <div className="friend-card-icon">
                  <ArrowBackIosIcon fontSize="large" onClick={()=> setCount(count-1)}/>
                </div>
                <div className="friend-card">
                  <RoleCard
                    role={role[count]?.role}
                    img={role[count]?.img}
                    noHover={true}
                  />
                  <Button sx={{ width: 180 }} variant="contained" onClick={addFriend}>
                    Ajouter
                  </Button>
                </div>
                <div className="friend-card-icon">
                  <ArrowForwardIosIcon fontSize="large" onClick={()=> setCount(count+1)}/>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

function FriendCard({name, img, removeFriend}) {

  function handleClick() {
    removeFriend({name: name, img: img})
  }

  return(
    <div className="amis-card">
        <Avatar alt={name} src={img} />
        <p>{name}</p>
        <HighlightOffIcon color="error" fontSize="large" onClick={handleClick}/>
      </div>
  )
}

export default AmisColumn;
