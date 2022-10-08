import React from 'react';

export function Main() {
  return (
    <div className="container">
      <div className="actives_block">
        <div className="left_slide" />
        <div className="actives">
          <div className="active">
            <div className="img_active" />
            <div className="text_active">
              <div className="title_active">Мастер класс</div>
              <div className="cost">10$</div>
            </div>
          </div>
          <div className="active">
            <div className="img_active" />
            <div className="text_active">
              <div className="title_active">Мастер класс</div>
              <div className="cost">10$</div>
            </div>
          </div>
        </div>
        <div className="right_slide" />
      </div>
      <div className="users_block">
        <div className="user">
          <div className="up_user">
            <div className="img_user">
              <img
                src="http://cs01.services.mya5.ru/DwABAIQAzQFeAc0B6v_D-w8/GY-6nffc3pO0E-W8Sd_zEw/sv/image/26/79/21/705098/20/d0e71037cab99435a4dfb7ccce819245.jpg?1543250883"
                alt=""
              />
            </div>
            <div className="lvl_user">3</div>
          </div>

          <div className="bottom_user">
            <div className="name_user">Женя Клависин</div>
            <div className="donat_user">+</div>
          </div>
        </div>
      </div>
    </div>
  );
}
