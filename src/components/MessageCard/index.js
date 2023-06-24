import { AiOutlineLike } from "react-icons/ai";
import "./index.css";

const MessageCard = (props) => {
  const { eachConvo, hours, minutes, increaseCount } = props;
  const { id, count, fullName, name, profileColor, inputText } = eachConvo;
  const onClickLikeBtn = () => {
    increaseCount(id);
  };

  return (
    <div className="message-cont">
      <div
        className="profile-container"
        style={{ backgroundColor: `${profileColor}` }}
      >
        <p>{name}</p>
      </div>
      <div className="name-message-cont">
        <div className="name-time-cont">
          <h1 className="user-name">{fullName}</h1>
          <p className="time">
            {hours}:{minutes}
          </p>
        </div>
        <div className="like-message-cont">
          <div className="bottom-message-cont">
            <h1 className="input-message">{inputText}</h1>
          </div>
          <button type="button" className="like-icon" onClick={onClickLikeBtn}>
            <AiOutlineLike size={18} />
          </button>
          {count === 0 ? <h5>{null}</h5> : <h5>{count}</h5>}
        </div>
      </div>
    </div>
  );
};
export default MessageCard;
