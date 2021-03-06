import styled from "styled-components";
import { Avatar, IconButton, Button } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from "react-firebase-hooks/firestore"
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import Chat from "./Chat";


const Sidebar = () => {

    const [user] = useAuthState(auth)
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)

    const [chatsSnapshot] = useCollection(userChatRef)

    // console.log(chatsSnapshot, "loginuser")
    const createChat = () => {
        const input = prompt('Please enter an email address for the user you wish to chat with')

        if (!input) {
            return null;
        }

        if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            // We need to add the chat into db 'chats' collection if it dosen't already exist and is valid;
            db.collection('chats').add({
                users: [user.email, input],
            })
        }
        // console.log("new_email_id")
    }

    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find(
                    (user) =>
                        user === recipientEmail)?.length > 0
        );



    const logOut = () => {
        auth.signOut()
        // console.log('logOut')
    }

    return (
        <Container>
            <Header>
                <UserAvatar onClick={logOut} src={user.photoURL} />
                <IconContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>

            <SidebarButton onClick={createChat} >Start a new chat</SidebarButton>

            {/* List of chats */}

            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    )
}

export default Sidebar;




const Container = styled.div`
   flex: 0.40;
   border-right: 1px solid whitesmoke;
   height: 100vh;
   min-width: 300px;
   max-width: 350px;
   overflow-y: scroll;

   ::-webkit-scrollbar {
       display: none;
   }

   -ms-overflow-style: none;
   scrollbar-width: none;
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
   

`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;


const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1000;
    justify-Content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;


const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;

const IconContainer = styled.div``;