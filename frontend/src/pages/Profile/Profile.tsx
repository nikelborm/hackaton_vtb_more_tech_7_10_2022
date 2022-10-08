import { useParams } from 'react-router-dom';

export function Profile() {
  const asd = useParams();
  // eslint-disable-next-line no-console
  console.log('Profile useParams: ', asd);
  return (
    <div className="container">
      <div className="info_lk">
        <div className="foto_goal">
          <div className="foto">
            <img
              src="http://cs01.services.mya5.ru/DwABAIQAzQFeAc0B6v_D-w8/GY-6nffc3pO0E-W8Sd_zEw/sv/image/26/79/21/705098/20/d0e71037cab99435a4dfb7ccce819245.jpg?1543250883"
              alt=""
            />
          </div>
          <div className="goal">
            <div className="title_goal">Моя цель</div>
            <textarea name="" id="" cols={32} rows={3} />
          </div>
          <div className="mission">
            <div className="title_mission">Моя Миссия</div>
            <textarea name="" id="" cols={32} rows={3} />
          </div>
          <button type="button">Перейти к рейтингу</button>
        </div>
        <div className="exp_name">
          <div className="up_name">
            <h2 className="name_lk">Женя Клависин</h2>
            <div className="lvl_lk">3</div>
            <div className="redact">-</div>
          </div>
          <div className="exp_lk">
            <div className="title_exp">Опыт для следущего уровня</div>
            <img src="" alt="" />
          </div>
          <div className="create_active" />
        </div>
        <div className="mony_lk">
          <div className="convert">23 money - 45Р </div>
          <div className="history">История транзакций</div>
          <div className="get_mony">Вывод средств</div>
        </div>
      </div>
      <div className="achiv_lk" />
    </div>
  );
}
