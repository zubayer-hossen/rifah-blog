import React from "react";
import toast from "react-hot-toast";
import {
  HiOutlineLink,
} from "react-icons/hi";
import {
  FaFacebook,
  FaWhatsapp,
  FaXTwitter,
  FaTelegram,
} from "react-icons/fa6";

/**
 * Plain URL-based social sharing (no third-party share SDK) so this never
 * breaks due to an upstream package renaming/removing exports.
 */
const ShareButtons = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FaFacebook,
      bg: "bg-[#1877F2]",
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: FaWhatsapp,
      bg: "bg-[#25D366]",
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: FaXTwitter,
      bg: "bg-black",
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: FaTelegram,
      bg: "bg-[#26A5E4]",
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    } catch {
      toast.error("Couldn't copy the link");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-body text-sm font-semibold text-plum/60">Share:</span>
      {links.map(({ name, href, icon: Icon, bg }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${name}`}
          className={`flex h-9 w-9 items-center justify-center rounded-full ${bg} text-white transition-transform hover:scale-110`}
        >
          <Icon size={18} />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-light text-lavender transition-transform hover:scale-110"
      >
        <HiOutlineLink />
      </button>
    </div>
  );
};

export default ShareButtons;
