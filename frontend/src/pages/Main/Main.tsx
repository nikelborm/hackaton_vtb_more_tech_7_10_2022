import { useAllUsersQuery } from 'hooks';
import React from 'react';
import {
  elonpicturepath,
  depositpicturepath,
  biggroupcturepath,
  donatepicturepath,
  taskspicturepath,
} from '../../assets';

export function Main() {
  const { users } = useAllUsersQuery();
  return (
    <div className="container">
      <div className="actives_block">
        <div className="left_slide">
          <img src={biggroupcturepath} alt="" className="left" />
        </div>
        <div className="actives">
          <div className="active">
            <div className="img_active">
              <img
                src="https://video-uslugi.ru/wp-content/uploads/2018/07/333-3.jpg"
                alt=""
              />
            </div>
            <div className="text_active">
              <div className="title_active">Мастер класс</div>
              <div className="cost">
                10
                <img src={depositpicturepath} alt="" />
              </div>
            </div>
          </div>
          <div className="active">
            <div className="img_active">
              <img
                src="https://video-uslugi.ru/wp-content/uploads/2018/07/333-3.jpg"
                alt=""
              />
            </div>
            <div className="text_active">
              <div className="title_active">Мастер класс</div>
              <div className="cost">
                10
                <img src={depositpicturepath} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="right_slide">
          <img src={biggroupcturepath} alt="" />
        </div>
      </div>
      <div className="midle_block">
        <div className="users_block">
          {users.map((user) => (
            <div className="user">
              <div className="up_user">
                <div className="img_user">
                  <img src={elonpicturepath} alt="" />
                </div>
              </div>

              <div className="bottom_user">
                <div className="title_user">
                  <div className="name_user">{user.name}</div>
                  <div className="rol_user">{user.rol}</div>
                </div>
                <div className="donat_user">
                  <img src={donatepicturepath} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="tasks">
          <img src={taskspicturepath} alt="" />
        </div>
      </div>
    </div>
  );
}
