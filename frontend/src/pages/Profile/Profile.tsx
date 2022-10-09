import { useMyOverallBalance } from 'hooks';
import { useParams } from 'react-router-dom';
import {
  imglkpcturepath,
  elonbadpcturepath,
  grouppicturepath,
  convertpcturepath,
  createpcturepath,
} from '../../assets';

export function Profile() {
  const asd = useParams();
  // eslint-disable-next-line no-console
  const { balance, nfts } = useMyOverallBalance();
  return (
    <div className="container">
      <div className="info_lk">
        <div className="foto_goal">
          <div className="foto">
            <img src={elonbadpcturepath} alt="" />
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
            <h2 className="name_lk">Женя Пирог</h2>
            <div className="balans">Счет {balance?.maticAmount}</div>
            <img src={imglkpcturepath} alt="" />
          </div>
          <div className="exp_lk">
            <div className="title_exp">Опыт для следущего уровня</div>
            <img src={grouppicturepath} alt="" />
          </div>
          <div className="create_active">
            <img src={createpcturepath} alt="" />
          </div>
        </div>
        <div className="mony_lk">
          <img src={convertpcturepath} alt="" />
          <div className="get_achiv">Указать полученный сертифкат</div>
        </div>
      </div>
      <div className="achiv_lk">
        <div className="achiv">
          <div className="img_achiv" />
          {nfts?.map((i) => (
            <div className="block_achiv">
              <div className="title_achiv">{i.certificateContent.name}</div>
              <div className="title_achiv">
                {i.certificateContent.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
