import React from 'react';

import styles from "./RoomStatus.module.css";

function RoomStatus(props)
{
  const { user, users = [] } = props;

  console.log(users);

  return (
    <div className={styles.UserList}>
      {
        users.map((otherUser) => 
        {
          return user.name === otherUser ?
            <code className='warning'>{otherUser}</code> :
            <code >{otherUser}</code>;
        })
      }
    </div>
  );
}

export default RoomStatus;
