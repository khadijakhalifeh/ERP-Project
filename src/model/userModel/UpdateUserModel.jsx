// import React, { useState } from 'react';
// import ModalComponent from '../ModelComponent';
// import { Select, MenuItem } from '@mui/material';

// //const post = useSelector((state) => state.posts); 

// const UpdateUserModal = ({ open, handleClose, handleSave, user }) => {
//   const [userData, setUserData] = useState(user);

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSaveUser = () => {
//     handleSave(userData);
//     handleClose();
//   };

//   return (
//     <ModalComponent
//       open={open}
//       handleClose={handleClose}
//       title="Update User"
//       handleSave={handleSaveUser}
//     >
//       <input name="name" value={userData.username} onChange={handleChange} />
//       <input name="email" value={userData.email} onChange={handleChange} />
//       <Select
//           label="Post Name"
//           name="postId"
//           value={user.postId}
//           onChange={handleChange}
//           fullWidth
//         >
//           {posts.map((post) => (
//             <MenuItem key={post.id} value={[post].id}>
//               {post.name}
//             </MenuItem>
//           ))}
//         </Select>
//     </ModalComponent>
//   );
// };

// export default UpdateUserModal;
