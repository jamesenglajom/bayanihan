import React from "react";

const EmailIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"
      />
    </svg>
  );
};

const PhoneIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"
      />
    </svg>
  );
};

function Contact() {
  const contactItems = [
    {
      icon: EmailIcon(),
      name: "Email",
      message: "Send as a message",
      value: "email.noemail.com",
    },
    {
      icon: PhoneIcon(),
      name: "Phone",
      message: "Call us anytime",
      value: "+1 (111) 111-1111",
    },
  ];
  return (
    <div id="contact" className="w-full py-7.5 my-7">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="font-bold">Connect</div>
          <h2 className="font-bold text-5xl font-fraunces">
            Send us a message
          </h2>
          <div>Tell us how we can help you</div>
        </div>
        <div className="flex gap-15">
          <div className="w-[50%] flex items-center">
            <div className="w-full flex flex-col gap-20">
              {contactItems.map((item, index) => (
                <div key={`contact-item-${index}`} className="flex flex-col gap-3">
                    <div>{item?.icon}</div>
                    <div className="font-fraunces text-3xl font-bold">{item?.name}</div>
                    <div>{item?.message}</div>
                    <div>{item?.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[50%] bg-neutral-200 text-neutral-500 flex items-center justify-center h-125">
            Form Here
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
