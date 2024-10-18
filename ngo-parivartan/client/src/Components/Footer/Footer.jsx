import React from "react";
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterComponent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Your page content goes here */}
      </div>
      <Footer container={true} className="bg-gray-800 text-white">
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            {/* Brand Section */}
            <div className="text-white">
              <h1 className="text-lg font-bold">Parivartn NGO</h1>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <FooterLinks title="About" links={["Flowbite", "Tailwind CSS"]} />
              <FooterLinks title="Follow Us" links={["Github", "Discord"]} />
              <FooterLinks title="Legal" links={["Privacy Policy", "Terms & Conditions"]} />
            </div>
          </div>

          <Footer.Divider className="border-gray-500" />

          {/* Copyright Section */}
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="Parivartn NGO" year={2024} />
            <SocialIcons />
          </div>
        </div>
      </Footer>
    </div>
  );
};

// Component for Footer Links
const FooterLinks = ({ title, links }) => (
  <div>
    <Footer.Title title={title} />
    <Footer.LinkGroup col={true}>
      {links.map((link, index) => (
        <Footer.Link href="#" key={index}>
          {link}
        </Footer.Link>
      ))}
    </Footer.LinkGroup>
  </div>
);

// Component for Social Icons
const SocialIcons = () => (
  <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
    <Footer.Icon href="#" icon={BsFacebook} />
    <Footer.Icon href="#" icon={BsInstagram} />
    <Footer.Icon href="#" icon={BsTwitter} />
    <Footer.Icon href="#" icon={BsGithub} />
    <Footer.Icon href="#" icon={BsDribbble} />
  </div>
);

export default FooterComponent;
