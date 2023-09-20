import {GET_CHATS, ADD_CHAT} from '../actions/chat'
import Chat from '../../models/Chat'
const initialState = {
    chats: [],
  };

const docReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CHATS:
        return {
          chats: action.chats
        };
      case ADD_CHAT:
        const chat = new Chat(
            action.chat_id,
            action.chatTitle,
            action.docs,
            action.createdAt
        )
        return {
            chats: state.chats.concat(chat)
        };
      default:
        return state;
    }
  };
  
export default docReducer;