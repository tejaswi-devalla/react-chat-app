import Mentions from "rc-mentions";
import { v4 as uuidv4 } from "uuid";
import InputEmoji from "react-input-emoji";
import { Component } from "react";
import { AiOutlineSend } from "react-icons/ai";
import MessageCard from "../MessageCard";
import "./index.css";

const colors = [
  "blue",
  "red",
  "black",
  "#6ba832",
  "#5832a8",
  "#6e0f4a",
  "#777a5c",
  "#a6754c",
  "#d9f58c",
  "#d9f58c",
  "#3a8d91",
  "#2d4b8a",
];
class ChatHome extends Component {
  likesCount = {};
  state = {
    inputText: "",
    profile: [],
    hours: 0,
    minutes: 0,
    mentionText: "",
  };
  onEnterInputText = (text) => {
    this.setState({ inputText: text });
  };
  sendMessage = () => {
    const { inputText, mentionText } = this.state;
    const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
    const randomNames = Math.floor(Math.random() * user_list.length);
    const filterNames = user_list[randomNames];
    const randomColors = Math.floor(Math.random() * colors.length);
    const filterColor = colors[randomColors];
    const date = new Date();
    this.setState((prevState) => ({
      inputText: "",
      mentionText: "",
      profile: [
        ...prevState.profile,
        {
          id: uuidv4(),
          fullName: filterNames,
          name: filterNames.slice(0, 2),
          profileColor: filterColor,
          inputText: mentionText + inputText,
        },
      ],
      hours: date.getHours(),
      minutes: date.getMinutes(),
    }));
  };

  increaseCount = (id) => {
    const { profile } = this.state;
    if ((this.likesCount[id] || 0) < 5) {
      this.likesCount[id] = (this.likesCount[id] || 0) + 1;
      this.forceUpdate();
      const getid = profile.map((eachItem) => eachItem.id === id);
      const index = getid.indexOf(true);
      profile[index].count = this.likesCount[id] || 0;
    }
  };

  onEnterMentionText = (text) => {
    this.setState({ mentionText: text });
  };

  render() {
    const { inputText, profile, hours, minutes, mentionText } = this.state;
    const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
    const { Option } = Mentions;
    console.log(mentionText);
    return (
      <div className="chat-home-container">
        <div className="header">
          <h1 className="group-text">Group Chat</h1>
          <hr className="line" />
          <h3 className="members-text">Members</h3>
          <hr className="line" />
          {user_list.map((eachItem) => (
            <p className="mem-list" key={uuidv4()}>
              {eachItem}
            </p>
          ))}
          <hr className="line" />
        </div>
        <div className="responsive-container">
          <div className="chat-container">
            {profile.map((eachItem) => (
              <MessageCard
                key={eachItem.id}
                eachConvo={eachItem}
                hours={hours}
                minutes={minutes}
                increaseCount={this.increaseCount}
              />
            ))}
          </div>
          <div className="input-container">
            <Mentions
              onChange={this.onEnterMentionText}
              placeholder="Add Mentions"
              placement="top"
              direction="rtl"
              split=" "
              style={{ color: "blue" }}
            >
              {user_list.map((eachName) => (
                <Option
                  key={eachName}
                  value={eachName}
                  className="mention-inputs"
                >
                  {eachName}
                </Option>
              ))}
            </Mentions>
            <InputEmoji
              value={inputText}
              onChange={this.onEnterInputText}
              cleanOnEnter
              placeholder="Type a message"
              theme="dark"
              shouldReturn="true"
              maxLength={50}
              borderColor="black"
              onEnter={this.sendMessage}
            ></InputEmoji>
            <button
              type="button"
              className="send-btn"
              onClick={this.sendMessage}
            >
              <AiOutlineSend size={25} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ChatHome;
