import React from "react";

const ChatModal = ({ handleCloseModal, handleAcceptGuideline }) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleCloseModal}
    >
      <div className="h-[60vh] w-[70vw] md:w-[50vw] overflow-scroll py-5 px-10 rounded-md bg-white z-10 block ">
        <div className="drktext">
          <h3 className="text-5xl text-center">Synergy Guidelines</h3>
          <p>
            We're glad you're here and excited to have you as a member of
            our website!!! Before you jump into it, please take a moment
            to read through our rules to ensure that everyone has a positive and
            respectful experience. Rules:
            </p> 
            <p>1. No Racism or Discrimination: Synergy Connect is committed to fostering an inclusive and diverse community. We do not tolerate any form of racism, discrimination, or hate speech. Treat every member with respect and embrace the diversity of our community.
            </p>
            <p>2. Foster a Respectable Space: Synergy Connect aims to create a positive and respectful space for all members. Avoid personal attacks, harassment, or any behavior that could be considered bullying. Treat others as you would like to be treated, fostering a welcoming and supportive atmosphere.
            </p>
            <p>3. No Cyberbullying: We have a zero-tolerance policy for cyberbullying. Do not engage in any form of online harassment, including sending threatening messages, spreading rumors, or intimidating others. Report any instances of cyberbullying to the moderators or administrators.
            </p>
            <p>4. Do not share inappropriate content. This includes anything that
            is violent, sexually explicit, or discriminatory in nature.</p>
            <p>5.
            Follow Synergy Connect's Terms of Service: Adhere to the terms of service set forth by Synergy Connect. Any behavior that violates these terms or disrupts the functioning of the platform will not be tolerated. Failure to comply with these guidelines may result in warnings, temporary suspension, or removal from the community.
            </p>
            <p>Remember, these guidelines are in place to ensure a safe, respectful, and inclusive environment for all members of Synergy Connect.</p>  
             
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
