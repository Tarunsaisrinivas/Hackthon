
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
//import dynamic from "next/dynamic";
import { useRouter } from "next/router";



import { 
  ChatEngine,chat, 
  ChatList,ChatCard, NewChatForm,
  ChatFeed, ChatHeader, IceBreaker, MessageBubble, IsTyping, ConnectionBar, NewMessageForm,
  ChatSettings, ChatSettingsTop, PeopleSettings, PhotosSettings, OptionsSettings
} from 'react-chat-engine'



const TheSameChatUI= (props) => {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();
 

  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (username === "" || secret === "") {
      router.push("/");
    }
  }, [username, secret]);

  if (!showChat) return <div />;
  

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(80vh - 0px)"
          projectID="2a9ad81d-7fa8-4e48-9174-2ac3ebe74a69"
          userName={username}
          userSecret={secret}
          renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
          renderChatCard={(chat, index) =>  
          <ChatCard key={`${index}`} chat={chat} />
           }
          renderNewChatForm={(creds) => <NewChatForm creds={creds} />} 
          renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
          renderChatHeader={(chat) => <ChatHeader />}
          renderIceBreaker={(chat) => <IceBreaker />}
          renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => {
            const isAdmin = chat.admin.username === creds.userName;
            const isSender = message.sender && message.sender.username === creds.userName;
            const istrue= message.sender && message.sender.username === chat.admin.username;
            if(istrue)
            {
              return (
                <div>
                  <MessageBubble
                    lastMessage={lastMessage}
                    message={message}
                    nextMessage={nextMessage}
                    chat={chat}
                  />
                </div>
              );
            }

            if (!isAdmin && !isSender ) {
              return null; // Don't render the message bubble
            }else{

            return (
              <div>
                <MessageBubble
                  lastMessage={lastMessage}
                  message={message}
                  nextMessage={nextMessage}
                  chat={chat}
                />
              </div>
            );}
          }}
          renderIsTyping={(typers) => <IsTyping />}
          renderConnectionBar={(chat) => <ConnectionBar />}
          renderNewMessageForm={(creds, chatID) => <NewMessageForm />}
          renderChatSettings={(chatAppState) => <ChatSettings {...chatAppState} />}
          renderChatSettingsTop={(creds, chat) => <ChatSettingsTop />}
          renderPeopleSettings={(creds, chat) => <PeopleSettings/>}
          renderPhotosSettings={(chat) => <PhotosSettings />}
          renderOptionsSettings={(creds, chat) => <OptionsSettings />}
          
        
		/>
      </div>
    </div>
  );
}
export default TheSameChatUI;
