import React from "react";

const ChatModal = ({ handleCloseModal, handleAcceptGuideline }) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleCloseModal}
    >
      <div className="h-[60vh] w-[70vw] md:w-[50vw] overflow-scroll py-5 px-10 rounded-md bg-white z-10 block ">
        <div>
          <h3 className="text-5xl">Synergy Guidelines</h3>
          <p>
            We're glad you're here and excited to have you as a member of
            cohort. Before you jump into the conversation, please take a moment
            to read through our rules to ensure that everyone has a positive and
            respectful experience. Rules:
            </p> 
            <p>1. Be respectful of others. Do not use
            hate speech, make personal attacks, or engage in any other behavior
            that could be considered harassment or bullying.</p>
            <p>2. Keep the
            conversation on topic. Please avoid discussing topics that are
            unrelated to the channel or server you are in.</p>
            <p>3. No spamming or
            self-promotion. Do not post the same message repeatedly or use the
            server to promote your own content or services without permission.</p>
            <p>4. Do not share inappropriate content. This includes anything that
            is violent, sexually explicit, or discriminatory in nature.</p>
            <p>5.
            Follow Discord's terms of service. Any behavior that violates
            Discord's terms of service will not be tolerated. Failure to follow
            these rules may result in a warning or removal from the server. If
            you have any questions or concerns, please reach out to a moderator
            or administrator for assistance.</p>  
             
          <div>
            <button onClick={handleCloseModal}>Decline</button>
            <button onClick={handleAcceptGuideline}>Accept</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
