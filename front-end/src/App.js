import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Discussion from "./pages/Discussion";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddDiscussion from './pages/AddDiscussion'
import EditDiscussion from "./pages/EditDiscussion";
import HomePage from "./pages/HomePage";
import ForumPage from "./pages/Forumpage";
import KonsultasiViaChat from "./pages/KonsultasiViaChat/KonsultasiViaChat";
import KonsultasiLangsung from "./pages/DirectConsultationPage/DirectConsultationPage";
import RoomChat from "./pages/RoomChatPages";
import ProfileLawyerPages from "./pages/ProfileLawyerPages";
import MessagesList from "./pages/MessageListPages";
import FormBookingLawyer from "./pages/formBookingLawyer/formBookingLawyer";
import PartnerListPages from "./pages/Partner/PartnerListPages";
import ListKonsultasi from './pages/ListKonsultasi/ListKonsultasiPages'
import AcceptedConsultant from './pages/ListKonsultasi/AcceptedPages'
import MyMessage from './pages/NotifyUser/NotifyPages'
import SignUp from './pages/SignUp/SignUpPages'
import ResetPasswordPages from "./pages/ResetPasswordPages/ResetPasswordPages";
import AddPartnerPages from "./pages/Partner/AddPartnerPages";
import EditPartnerPages from "./pages/Partner/EditPartnerPages";
import ProfilPages from "./pages/Profil/ProfilPages";
import EditProfilPages from "./pages/Profil/EditProfilPages";
import AddDiscussionPages from "./pages/AddDiscussion/AddDiscussionPages";



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/add" element={<AddUser/>}/>
        <Route path="/users/edit/:id" element={<EditUser/>}/>
        <Route path="/discussion" element={<Discussion/>}/>
        <Route path="/discussion/add" element={<AddDiscussion/>}/>
        <Route path="/add/discussion" element={<AddDiscussionPages/>}/>
        <Route path="/discussion/edit/:id" element={<EditDiscussion/>}/>
        <Route path="/discussionforum" element={<ForumPage/>}/>
        <Route path="/ChatConsultationPage" element={<KonsultasiViaChat/>}/>
        <Route path="/DirectConsultationPage" element={<KonsultasiLangsung/>}/>
        <Route path="/discussion/:id" element={<RoomChat/>}/>
        <Route path="/lawyers/:id" element={<ProfileLawyerPages/>}/>
        <Route path="/message" element={<MessagesList/>}/>
        <Route path="/booking/:userId" element={<FormBookingLawyer/>}/>
        <Route path="/partners" element={<PartnerListPages/>}/>
        <Route path="/partners/add" element={<AddPartnerPages/>}/>
        <Route path="/partners/edit/:id" element={<EditPartnerPages/>}/>
        <Route path="/form" element={<ListKonsultasi/>}/>
        <Route path="/formaccepted" element={<AcceptedConsultant/>}/>
        <Route path="/notif/:id" element={<MyMessage/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/resetpassword" element={<ResetPasswordPages/>}/>
        <Route path="/users/:id" element={<ProfilPages/>}/>
        <Route path="/profil/edit/:id" element={<EditProfilPages/>}/>
        


        {/* <Route path="/Room" element={</>}/> */}
        {/* <Route path="/:discussionId" element={<RoomChat/>}/> */}
                

        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
