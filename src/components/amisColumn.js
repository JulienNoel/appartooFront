import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import RoleCard from "./roleCard";
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
  minWidth: 340,
};

function AmisColumn({ token }) {
  const [dataList, setDataList] = useState([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [friendList, setFriendList] = useState([]);
  const [error, setError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function loadFriendsFromDb() {
      const response = await fetch(`https://mysterious-sands-93126.herokuapp.com/findfriend/${token}`);
      const rawResponse = await response.json();
      if (response) {
        setDataList(rawResponse?.result);
        setFriendList(rawResponse?.friend);
      }
    }
    loadFriendsFromDb();
  }, []);

  async function updateFriends() {
    const response = await fetch("https://mysterious-sands-93126.herokuapp.com/updatefriend", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${token}&name=${dataList[count]?.name}&img=${dataList[count]?.img}`,
    });

    const rawResponse = response.json();

    !rawResponse ? setError(true) : setError(false);
  }

  async function deleteFriend(friend) {
    const response = await fetch("https://mysterious-sands-93126.herokuapp.com/deletefriend", {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${token}&name=${friend?.name}&img=${friend?.img}`,
    });

    const rawResponse = response.json();

    !rawResponse ? setError(true) : setError(false);
  }

  function removeFromList(array, data) {
    return array.filter((el) => el.img !== data.img);
  }

  function addFriend() {
    const addToList = {
      name: dataList[count]?.name,
      img: dataList[count]?.img,
    };
    setFriendList([...friendList, addToList]);
    setDataList(removeFromList(dataList, addToList));
    updateFriends();
    handleClose();
  }

  function removeFriend(friend) {
    setFriendList(removeFromList(friendList, friend));
    setDataList([...dataList, friend]);
    deleteFriend(friend);
  }

  if (dataList.length > 0) {
    if (count < 0) {
      setCount(dataList.length - 1);
    } else if (count > dataList.length - 1) {
      setCount(0);
    }
  }

  function changeCard(el) {
    el === "+" && setCount(count + 1);
    el === "-" && setCount(count - 1);
  }

  

  return (
    <div className="role-ami-column">
      <h2>Mes Amis</h2>
      <div className="list-amis">
        {friendList.map((el) => {
          return (
            <FriendCard
              name={el.name}
              img={el.img}
              key={el.img}
              removeFriend={removeFriend}
            />
          );
        })}
      </div>
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
            <div>
              <div className="display-friend-card">
                <div className="friend-card-icon">
                  <ArrowBackIosIcon
                    fontSize="large"
                    onClick={() => {
                      changeCard("-");
                    }}
                  />
                </div>
                {dataList.length > 0 ? (
                  <div className="friend-card">
                    <RoleCard
                      role={dataList[count]?.name}
                      img={dataList[count]?.img}
                      noHover={true}
                    />
                    <Button
                      sx={{ width: 180 }}
                      variant="contained"
                      onClick={addFriend}
                    >
                      Ajouter
                    </Button>
                  </div>
                ) : (
                  <div className="friend-card">
                    <p style={{color: 'black',textAlign: 'center'}}>La liste est vide</p>
                  </div>
                )}

                <div className="friend-card-icon">
                  <ArrowForwardIosIcon
                    fontSize="large"
                    onClick={() => {
                      changeCard("+");
                    }}
                  />
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

function FriendCard({ name, img, removeFriend }) {
  function handleClick() {
    removeFriend({ name: name, img: img });
  }

  return (
    <div className="amis-card">
      <Avatar alt={name} src={img} />
      <p>{name}</p>
      <HighlightOffIcon
        className="delete-icon"
        color="error"
        fontSize="large"
        onClick={handleClick}
      />
    </div>
  );
}

export default AmisColumn;
